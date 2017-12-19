import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../shared.service';
import { MarkService } from './mark.service';

@Component({
  templateUrl: 'mark-list.component.html'
})

export class MarkListComponent implements OnInit {

  marks: any;
  questionList = [];

    constructor(private _sharedService: SharedService, private _markService: MarkService) {

  }

  ngOnInit(): void {
    this.reload();
  }

  stringify(j) {
    return JSON.stringify(j);
  }

  reload(): void {
    //this._sharedService.makeRequest('GET', 'assets/api/exams/marklist.json', '').then((data: any) => {
    this._sharedService.makeRequest('GET', '/exam/marktask/list/', '').then((data: any) => {
      //cache the list
      console.log('data: ' + JSON.stringify(data));
      this.marks = data;
      for (const mark of this.marks) {
        if (mark.markType === '标准' && mark.summary[0].composable === true) {
          const question = { 'id': '', 'n': '' };
          question.id = mark.summary[0].quesid;
          question.n = mark.summary[0].questionName;
          this.questionList.push(question);
        }
      }
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

  getProgress(rawData): string {
    return this._markService.getProgress(rawData);
  }

  getQuestion(questionId, questionName): string {
    const questionList = [];
    const question = {'id': '', 'n': ''};
    question.id = questionId;
    question.n = questionName;
    questionList.push(question);
    return JSON.stringify(questionList);
  }
}
