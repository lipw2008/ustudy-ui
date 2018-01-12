import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { sprintf } from 'sprintf-js';
import * as _ from 'lodash';

@Component({
  templateUrl: './mark-details.component.html',
  styleUrls: ['./mark-details.component.css']
})
export class MarkDetailsComponent implements OnInit {
  questionList = [];
  tab = 'subjectReview';

  constructor(private _dataService: DataService, public route: ActivatedRoute) { }

  ngOnInit() {
    console.log("metrics is "+ this.route.snapshot.params.metrics);
    this.questionList = _.orderBy(JSON.parse(this.route.snapshot.params.metrics), 'quesName');
    // this.reload()
  }
  // reload(): void {
  //   this._dataService.getMarks().then((data: any) => {
  //     this.marks = data;
  //     for (const mark of this.marks) {
  //       if (mark.markType === '标准') {
  //         for (const s of mark.summary) {
  //           s.teacherName = mark.teacherName
  //         }
  //         this.questionList = this.questionList.concat(mark.summary);
  //       }
  //     }
  //   }).catch((error: any) => {
  //     console.log(error.status);
  //     console.log(error.statusText);
  //   });
  // }

  // getQuestionNames(mark: any) {
  //   return mark.summary.map((s) => {
  //     return s.questionName
  //   }).join(',');
  // }

  // getQuestionProgress(question: any) {
  //   return sprintf('%.2f%%', question.markedNum / question.mark.total * 100)
  // }

  // getTeacherProgress(mark) {
  //   const progresses = mark.summary.map((question) => {
  //     return question.markedNum / question.mark.total
  //   });
  //   if (progresses.length === 0) {
  //     return '0%'
  //   }
  //   return sprintf('%.2f%%', _.sum(progresses) / progresses.length * 100)
  // }
}
