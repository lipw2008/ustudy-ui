import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../shared.service';
import { ProblemService } from './problem.service';

@Component({
  templateUrl: 'problem-list.component.html'
})

export class ProblemListComponent implements OnInit {

  rows = [];

  constructor(private _sharedService: SharedService, private _problemService: ProblemService) {

  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    //this._sharedService.makeRequest('GET', 'assets/api/exams/expapersum.json', '').then((data: any) => {
    this._sharedService.makeRequest('GET', '/exam/expaper/sum/', '').then((data: any) => {
      //cache the list
      console.log('data: ' + JSON.stringify(data));
      this.rows = data.data;
      for (let row of this.rows) {
        row.gradeSub = row.gradeName + row.subName;
        let paperNum = {
          'num': 0,
          'egsId': 0
        }
        paperNum.num = row.num;
        paperNum.egsId = row.egsId;
        row.paperNum = paperNum;
      }
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }
}
