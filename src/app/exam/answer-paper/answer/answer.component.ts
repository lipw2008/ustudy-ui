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
  //from parent
  egsId: number;
  gradeId: number;
  subName: string;
  questionId: number;
  type: string;
  questionList: any;

  //data
  papers: any;
  grade: any;
  temp: any;

  //filter
  examCode: string;
  selectedQuestion: any;
  viewAnswerPaper = false;
  selectedClass: any;

  modalRef: BsModalRef;

  answers: Array<any>;
  areas: Array<any>;
  selectedImgUrls: Array<string>;

  constructor(private route: ActivatedRoute, private _answerService: AnswerService, private _taskService: TaskService,
              private _sharedService: SharedService, private modalService: BsModalService) { }

  ngOnInit() {
    this.egsId = Number(this.route.snapshot.params.egsId);
    this.gradeId = Number(this.route.snapshot.params.gradeId);
    this.subName = this.route.snapshot.params.subName;
    this.questionId = Number(this.route.snapshot.params.questionId);
    this.questionList = JSON.parse(this.route.snapshot.params.questionList);
    this.type = this.route.snapshot.params.type;
    if (this.type === 'class') {
      this.viewAnswerPaper = Boolean(this.route.snapshot.params.viewAnswerPaper);
    }
    this.selectedQuestion = this.questionList[0];
    for(let question of this.questionList) {
      if (question.id === this.questionId) {
        this.selectedQuestion = question;
        break;
      }
    }
    Promise.all([
      this._taskService.getGrade(this.gradeId).then((data) => {
        this.grade = data
      }),
      this._answerService.getPapers(this.egsId, this.selectedQuestion.id).then((data: any) => {
        this.papers = data;
        this.temp = [...data];
      })
    ]).then(() => this.returnResult())
  }

  onQuestionChange() {
    console.log(`question changed:`, JSON.stringify(this.selectedQuestion));
    Promise.all([
      this._answerService.getPapers(this.egsId, this.selectedQuestion.id).then((data: any) => {
        this.papers = data;
        this.temp = [...data];
      })
    ]).then(() => this.returnResult())
  }

  moveQuestion(step) {
    const index = _.findIndex(this.questionList, this.selectedQuestion), length = this.questionList.length;
    this.selectedQuestion = this.questionList[index + step];
    this.onQuestionChange();
  }

  getUrl(paper) {
    if (this.viewAnswerPaper) {
      return paper.paperImg.split(',').map((url) => this._sharedService.getImgUrl(url, ''))
    } else {
      return paper.ansMarkImg.split(',').map((url) => this._sharedService.getImgUrl(url, ''))
    }
  }

  viewPaper(template: TemplateRef<any>, paper: any) {
    this.selectedImgUrls = this.getUrl(paper);
    this.modalRef = this.modalService.show(template,  { class: 'gray modal-lg'});
  }

  returnResult() {
    let options = {
      clsName: '',
      examCode: ''
    };

    if (this.selectedClass) {
      options.clsName = this.selectedClass.name
    }

    if(this.examCode) {
      options.examCode = this.examCode
    }
    console.log(`paper list(before filter): `, JSON.stringify(this.papers));
    console.log(`options: `, JSON.stringify(options));
    // filter our data
    if (this.papers) {
      const temp = this.temp.filter(function(d) {
        return d.clsName.indexOf(options.clsName) !== -1
          && d.examCode.indexOf(options.examCode) !== -1;
      });
      this.papers = temp;
    }
    console.log(`paper list: `, JSON.stringify(this.papers));
  }
}
