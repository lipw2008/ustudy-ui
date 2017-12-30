import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  examId: number;
  gradeId: number;
  subjectId: number;
  seted: boolean;

  markTasks: any;
  gradesubjects: any;
  subjects: any;
  exam: any;
  selectedSubject: any;
  questions: any;
  tasks: any[];
  gradeTeachers = [];
  subjectTeachers = [];
  teachers = [];

  constructor(private _taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.examId = Number(this.route.snapshot.params.examId);
    this.gradeId = Number(this.route.snapshot.params.gradeId);
    this.subjectId = Number(this.route.snapshot.params.subjectId);
    this.seted = this.route.snapshot.params.seted;
    this.exam = this.route.snapshot.params.exam;
    this._taskService.getTeachers().then((data: any) => {
      this.gradeTeachers = data;
      this.subjectTeachers = this._taskService.toggleGrade(this.gradeTeachers, null);
      this.teachers = this._taskService.subjectTeachersToTeachers(this.subjectTeachers);
    });
    this._taskService.getMarkTasks(this.examId, this.gradeId, this.subjectId).then((data: any) => {
      if (data === null) {
        data = []
      }
      data.forEach((task) => {
        if (task.teachersIds === null) {
          task.teachersIds = []
        }
        if (task.finalMarkTeachersIds === null) {
          task.finalMarkTeachersIds = []
        }
      });
      this.markTasks = data;
      this._taskService.getExamSubjects(this.examId).then((data: any) => {
        const gradesubjects = data;
        this.gradesubjects = _.reduce(_.map(gradesubjects, 'subjects'), (res, i) => res.concat(i), []);
        if (this.subjectId) {
          for (const subject of this.gradesubjects) {
            if (subject.subId === this.subjectId && subject.gradeId === this.gradeId && subject.examid === this.examId) {
              this.selectedSubject = subject;
            }
          }
        } else {
          this.selectedSubject = _.first(gradesubjects)
        }
        this.setFiltetedTasks()
      })
    });
  }

  setFiltetedTasks() {
    this._taskService.getQuestions(this.examId, null, this.selectedSubject.gradeId, this.selectedSubject.subId).then((data) => {
      this.questions = data;
      this.tasks = _.filter(this.markTasks, { gradeId: String(this.selectedSubject.gradeId), subjectId: String(this.selectedSubject.subId) });
      this.tasks.forEach((task) => {
        task.question = _.find(this.questions, { id: Number(task.questionId) });
        task.group = _.find(_.get(_.find(this.gradeTeachers, {gradeId: this.gradeId}), 'subjects'), (subject) => _.includes(subject.subName, this.selectedSubject.subName))
      })
    })
  }

  getTeachers(task: any) {
    return task.teachersIds.map(teacherId => _.find(this.teachers, { teacId: teacherId }).teacName)
      .concat(task.finalMarkTeachersIds.map(teacherId => _.get(_.find(this.teachers, { teacId: teacherId }), 'teacName')))
      .filter((teacher) => !_.isEmpty(teacher))
  }

  getGroupMember(subject) {
    return _.filter(this.teachers, (teacher) => _.includes(teacher.groups, subject.subName))
  }

  setOwner(task: any, $event: any) {
    if ($event.target.value === 0) {
      return
    }
    this._taskService.updateMarkTask(task).then((res: any) => {
      if (res.success) {
        alert('任务：负责人更新成功');
        task.ownerId = $event.target.value
      } else {
        alert('任务：负责人更新失败')
      }
    }
    )
  }

  deleteTask(task: any, i) {
    this._taskService.deleteMarkTask(task).then((res: any) => {
      if (res.success) {
        alert('任务删除成功');
        // _.remove(this.tasks, task)
        this.tasks.splice(i, 1);
        _.remove(this.markTasks, (t) => t === task)
      } else {
        alert('任务删除失败')
      }
    })
  }

  editTask(task: any) {
    this.router.navigate(['/taskassign', {
      examId: this.examId, gradeId: this.gradeId,
      subjectId: this.selectedSubject.subId, questionId: task.questionId, subject: this.selectedSubject.subName
    }]);
  }


}
