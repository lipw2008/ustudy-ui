import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { sprintf } from 'sprintf-js';
import * as _ from 'lodash';

@Component({
  selector: 'app-mark-details',
  templateUrl: './mark-details.component.html',
  styleUrls: ['./mark-details.component.css']
})
export class MarkDetailsComponent implements OnInit {
  tab: String = 'subjectReview';
  marks: any;
  questionList = [];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.reload()
  }
  reload(): void {
    this._dataService.getMarks().then((data: any) => {
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

  getQuestionNames(mark: any) {
    return mark.summary.map((s) => {
      return s.questionName
    }).join(',');
  }

  getQuestionProgress(question: any) {
    return sprintf('%.2f%%', question.markedNum / question.mark.total * 100)
  }

  getTeacherProgress(mark) {
    const progresses = mark.summary.map((question) => {
      return question.markedNum / question.mark.total
    });
    if (progresses.length === 0) {
      return '0%'
    }
    return sprintf('%.2f%%', _.sum(progresses) / progresses.length * 100)
  }
}
