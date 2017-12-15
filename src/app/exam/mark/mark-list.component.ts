import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../shared.service';

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
      console.log("data: " + JSON.stringify(data));
      this.marks = data;
      for (let mark of this.marks) {
        if (mark.markType === "标准") {
          let question = { "id": "", "n": "" };
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
}
