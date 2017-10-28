import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent implements OnInit {
  tab: String = 'subjectReview';
  marks: any;
  questionList = [];

  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.reload()
  }
  reload(): void {
    this._sharedService.makeRequest('GET', 'assets/api/exams/marklist.json', '').then((data: any) => {
      console.log('data: ' + JSON.stringify(data));
      this.marks = data;
      for (const mark of this.marks) {
        if (mark.markType === '标准') {
          for (const s of mark.summary) {
            s.teacherName = mark.teacherName
          }
          this.questionList = this.questionList.concat(mark.summary);
        }
      }
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

  getQuestionNames(mark: any ) {
    let res;
    res =  mark.summary.map((s) => {
      return s.questionName
    }).join(',');
    return res
  }
}
