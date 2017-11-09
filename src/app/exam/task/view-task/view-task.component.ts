import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../task.service';
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
  grade: any;

  constructor(private _taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.examId = Number(this.route.snapshot.params.examId);
    this.gradeId = Number(this.route.snapshot.params.gradeId);
    this.subjectId = Number(this.route.snapshot.params.subjectId);
    this.seted = this.route.snapshot.params.seted;
    this.exam = this.route.snapshot.params.exam;
    this._taskService.getGrade(this.gradeId).then((data) => {
      this.grade = data
    });
    this._taskService.getMarkTasks(this.examId, this.gradeId, this.subjectId).then((data) => {
      this.markTasks = data;
      this._taskService.getExamSubjects(this.examId).then((data) => {
        const gradesubjects = data;
        this.gradesubjects = _.reduce(_.map(gradesubjects, 'subjects'), (res, i) => res.concat(i), []);
        if (this.subjectId) {
          for (const subject of this.gradesubjects) {
            if (subject.subId === this.subjectId && subject.gradeId === this.gradeId && subject.examid === this.examId) {
              this.selectedSubject = subject;
              this.setFiltetedTasks()
            }
          }
        }
      })
    });
  }

  setFiltetedTasks() {
    this._taskService.getQuestions(this.examId, null, this.selectedSubject.gradeId, this.selectedSubject.subId).then((data) => {
      this.questions = data;
      this.tasks = _.filter(this.markTasks, {gradeId: String(this.selectedSubject.gradeId), subId: String(this.selectedSubject.id)});
      this.tasks.forEach((task) => {
        task.question = _.find(this.questions, {id: Number(task.questionId)});
        task.group = _.find(this.grade.groups, (group) => _.includes(group.name, this.selectedSubject.subName))
      })
    })
  }

  getTeachers(task: any) {
    return task.teachersIds.map( teacherId => _.find(this.grade.teachers, {id: teacherId}).name)
      .concat( task.finalMarkTeachersIds.map( teacherId => _.find(this.grade.teachers, {id: teacherId}).name))
  }

  getGroupMember(group) {
    return _.filter(this.grade.teachers, {group: group.id})
  }

  setOwner(task: any, $event: any) {
    if ($event.target.value === 0) {
      return
    }
    this._taskService.updateMarkTask({ownerId: $event.target.value}).then((res: any) => {
        if (res.success) {
          alert('任务：负责人更新成功');
          task.ownerId = Number($event.target.value)
        } else {
          alert('任务：负责人更新失败')
        }
      }
    )
  }

  deleteTask(task: any) {
    this._taskService.deleteMarkTask(task.id).then((res: any) => {
      if (res.success) {
        alert('任务：负责人删除成功');
        // _.remove(this.tasks, task)
        delete task.ownerId;
        task.teachersIds = [];
        task.finalMarkTeachersIds = [];
        task.type = ''
      } else {
        alert('任务：负责人删除失败')
      }
    })
  }

  editTask(task: any) {
    this.router.navigate(['/taskassign', { examId: this.examId, gradeId: this.gradeId,
      subjectId: this.selectedSubject.id, questionId: task.questionId, subject: this.selectedSubject.subName}]);
  }


}
