import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '../answer.service';
import * as _ from 'lodash';
import { TaskService } from '../../task/task.service';
import { SharedService } from '../../../shared.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap';

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
  answers: Array<any>;
  areas: Array<any>;
  modalRef: BsModalRef;
  selectedImgUrls: Array<string>;

  constructor(private route: ActivatedRoute, private _answerService: AnswerService, private _taskService: TaskService,
              private _sharedService: SharedService, private modalService: BsModalService) { }

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

  getUrl(answer) {
    if (this.viewAnswerPaper) {
      return answer.paperImg.split(',').map((url) => this._sharedService.getImgUrl(url, ''))
    } else {
      return this.areas.map((area) => {
        return this._sharedService.getImgUrl(answer.paperImg.split(',')[area.pageno], {x: area.posx, y: area.posy, w: area.width, h: area.height})
      })
    }
  }

  viewAnswer(template: TemplateRef<any>, answer: any) {
    this.selectedImgUrls = this.getUrl(answer);
    this.modalRef = this.modalService.show(template,  { class: 'gray modal-lg'});
  }

  returnResult() {
    const params = Object.create({});
    params.egsId = this.subject.id;
    if (this.type !== 'class') {
      params.type = this.type
    }
    // if (this.viewAnswerPaper) {
    //   params.viewAnswerPaper = true
    // }
    if (this.selectedClass) {
      params.classId = this.selectedClass.id
    }
    if (this.text) {
      params.text = this.text
    }
    if (true || !this.viewAnswerPaper) {
      const question_id = _.get(this, 'selectedQuestion.id');
      if (!this.questionId) {
        alert('请选择题目');
        return
      }
      params.questionId = question_id
    }
    this._answerService.getAnswerPapers(params).then((data: any) => {
      this.answers = data.papers;
      this.areas = data.quesareas;
    })
  }
}
