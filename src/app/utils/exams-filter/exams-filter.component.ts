import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExamService } from '../../exam/exam.service';
import * as _ from 'lodash';

@Component({
  selector: 'exams-filter',
  templateUrl: './exams-filter.component.html',
  styleUrls: ['./exams-filter.component.css']
})
export class ExamsFilterComponent implements OnInit {
  examOptions: any;
  bsRangeValue = [null, null];
  name: '';
  @Output() result = new EventEmitter();
  selectedGrade: any;
  selectedSubject: any;

  constructor(private _examService: ExamService) { }

  ngOnInit() {
    this._examService.getExamOptions().then((data) => {
      this.examOptions = data
    })
  }

  onSelected($event: Event) {
    return null
  }

  returnResult() {
    const options = Object.create({});
    if (this.selectedSubject) {
      options.subjectId = this.selectedSubject.id
    }
    if (this.selectedGrade) {
      options.gradeId = this.selectedGrade.id
    }
    if (this.name) {
      options.examName = this.name
    }
    const start = _.first(this.bsRangeValue);
    const end = _.last(this.bsRangeValue);
    if (start != null) {
      options.start = `${start!.getFullYear()}-${start!.getMonth() + 1}-${start!.getDate()}`
    }
    if (end != null) {
      options.end = `${end!.getFullYear()}-${end!.getMonth() + 1}-${end!.getDate()}`
    }
    this._examService.filterExamSubjects(options).then((data) =>
      this.result.emit(data)
    )
  }
}
