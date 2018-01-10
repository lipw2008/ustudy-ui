import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../shared.service';
import { MarkService } from './mark.service';

@Component({
  templateUrl: 'mark-list.component.html'
})

export class MarkListComponent implements OnInit {

  marks: any;

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
      this.marks = data.sort(this.sortQuesName);
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

  sortQuesName(a, b) {
    let q1 = a.summary[0].questionName;
    let q2 = b.summary[0].questionName;
    if (q1 < q2) {
      return -1;
    } else { 
      return 1;
    }
  }

  getProgress(rawData): string {
    return this._markService.getProgress(rawData);
  }

  getQuestion(questionId, questionName): string {
    let questionList = [];
    let question = {'id': '', 'n': ''};
    question.id = questionId;
    question.n = questionName;
    questionList.push(question);
    return JSON.stringify(questionList);
  }

  getQuestionList(subject): string {
  	let questionList = [];
	for (let mark of this.marks) {
		if (mark.markType === '标准' && mark.summary[0].composable === true && mark.subject === subject) {
		  let question = { 'id': '', 'n': '' };
		  question.id = mark.summary[0].quesid;
		  question.n = mark.summary[0].questionName;
		  questionList.push(question);
		}
	}
    return JSON.stringify(questionList);
  }
}
