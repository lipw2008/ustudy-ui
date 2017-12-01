import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '../answer.service';
import * as _ from 'lodash';
import { TaskService } from '../../task/task.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  examId: number;
  gradeId: number;
  subjectId: number;
  questionId: number;
  type: string;
  subject: any;
  grade: any;
  selectedQuestion: any;
  text = '';
  viewAnswerPaper = false;
  selectedClass: any;

  constructor(private route: ActivatedRoute, private _answerService: AnswerService, private _taskService: TaskService) { }

  ngOnInit() {
    this.examId = Number(this.route.snapshot.params.examId);
    this.gradeId = Number(this.route.snapshot.params.gradeId);
    this.subjectId = Number(this.route.snapshot.params.subjectId);
    this.questionId = Number(this.route.snapshot.params.questionId);
    this.type = this.route.snapshot.params.type;
    this._taskService.getGrade(this.gradeId).then((data) => {
      this.grade = data
    });
    this._answerService.getEGS(this.examId, this.gradeId, this.subjectId).then((data: any) => {
      this.subject = _.first(data);
      this.selectedQuestion = _.find(this.subject.questions, { id: this.questionId })
    })
  }
  getQuestionName(question: any) {
    if (question.quesno) {
      return question.quesno
    } else {
      return `${question.startno}-${question.endno}`
    }
  }

  moveQuestion(step) {
    const index = _.findIndex(this.subject.questions, this.selectedQuestion), length = this.subject.length;
    this.selectedQuestion = this.subject.questions[index + step]
  }

  returnResult() {
    const params = Object.create({});
    if (this.type !== 'class') {
      params.type = this.type
    }
    if (this.viewAnswerPaper) {
      params.viewAnswerPaper = true
    }
    if (this.selectedClass) {
      params.class_id = this.selectedClass.id
    }
    if (this.text) {
      params.text = this.text
    }
    if (!this.viewAnswerPaper) {
      params.question_id = this.selectedQuestion.id
    }
    this._answerService.getAnswerPapers(params)
  }
}
