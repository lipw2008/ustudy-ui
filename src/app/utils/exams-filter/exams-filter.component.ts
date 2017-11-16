import { Component, OnInit } from '@angular/core';
import {ExamService} from '../../exam/exam.service';

@Component({
  selector: 'exams-filter',
  templateUrl: './exams-filter.component.html',
  styleUrls: ['./exams-filter.component.css']
})
export class ExamsFilterComponent implements OnInit {
  examOptions: any;

  constructor(private _examServic: ExamService) { }

  ngOnInit() {
    this._examServic.getExamOptions().then((data) => {
      this.examOptions = data
    })
  }

  onSelected($event: Event) {
    return null
  }
}
