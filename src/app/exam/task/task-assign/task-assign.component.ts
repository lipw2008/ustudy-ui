import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-task-assign',
  templateUrl: './task-assign.component.html',
  styleUrls: ['./task-assign.component.css']
})
export class TaskAssignComponent implements OnInit {
  examId: string;
  gradeId: string;
  subjectId: string;
  subject: string;
  questionId: string;
  questions: any;
  assignType = '平均';
  markType = '单评';
  grade: any;
  selectedQuestion: any;
  selectedTeacherIds: any;
  selectedFinalTeacherIds = [];
  withTeachersIds = [];
  withFinalTeachersIds = [];
  timeLimit: Number;

  constructor(private _taskService: TaskService, private route: ActivatedRoute, private router: Router, private _location: Location) { }

  ngOnInit() {
    this.examId = this.route.snapshot.params.examId;
    this.gradeId = this.route.snapshot.params.gradeId;
    this.subjectId = this.route.snapshot.params.subjectId;
    this.subject = this.route.snapshot.params.subject;
    this.questionId = this.route.snapshot.params.questionId;
    this._taskService.getGrade(this.gradeId).then((data) => {
      this.grade = data
    });
    this._taskService.getQuestions(this.examId, null, this.gradeId, this.subjectId).then((data) => {
      if (this.questionId) {
        this.questions = _.filter(data, {id: Number(this.questionId)});
        this.selectedQuestion = this.questions[0]
      } else {
        this.questions = data
      }
    }).then(() => {
      if (this.questionId) {
        this._taskService.getTask(this.examId, this.gradeId, this.subjectId, this.questionId).then((data: any) => {
          if (_.includes(['平均', '动态'], data.type)) {
            this.assignType = data.type;
          }
          this.markType = _.isEmpty(data.finalMarkTeachersIds) ? '单评' : '双评';
          this.withTeachersIds = data.teachersIds;
          this.selectedTeacherIds = _.clone(this.withTeachersIds);
          this.withFinalTeachersIds = data.finalMarkTeachersIds;
          this.timeLimit = Number(data.timeLimit)
        })
      }
    })
  }

  setSelectedQuestion($event: Event) {
    console.log(1)
  }

  submit() {
    const method = this.questionId ? this._taskService.creatMarkTask : this._taskService.updateMarkTask;
    method({examId: this.examId, questionId: this.selectedQuestion.id, teachersIds: this.selectedTeacherIds, type: this.assignType,
      gradeId: this.gradeId, subjectId: this.subjectId, ownerId: _.find(this.grade.groups, (group) => _.includes(group.name, this.subject)),
      finalMarkTeachersIds: _.without(this.selectedFinalTeacherIds, this.selectedTeacherIds),
      timeLimit: this.timeLimit}).then((data) => {
      console.log(data);
      if (_.get(data, 'success')) {
        this.selectedQuestion.created = true;
        const index = _.findIndex(this.questions, this.selectedQuestion);
        if (index + 1 < this.questions.length) {
          this.selectedQuestion = this.questions[index + 1];
          alert('题目设置成功，自动跳到题目：' + this.selectedQuestion.questionName);
        } else {
          alert('所有题目设置完成，可以点击完成返回');
        }
        console.log('done');
      } else {
        // warning
      }
    });
  }

  finish() {
    if (_.every(this.questions, {created: true})) {
      alert('科目任务分配完成');
      this._location.back()
    } else {
      alert('还有未完成科目')
    }
  }
}
