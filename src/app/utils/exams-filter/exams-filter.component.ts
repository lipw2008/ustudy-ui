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
  exams: any;

  constructor(private _examService: ExamService) { }

  ngOnInit() {
    this._examService.getExamOptions().then((data) => {
      this.examOptions = data
    });
    this._examService.getTeacherExams().then((data) => {
      this.exams = data;
      this.result.emit(data)
    });
  }

  onSelected($event: Event) {
    return null
  }

  returnResult() {
    const options = Object.create(
      {
        subjectName: '',
        gradeName: '',
        examName: '',
        start: '',
        end: ''
    });

    if (this.selectedSubject) {
      options.subjectName = this.selectedSubject.name
    }
    if (this.selectedGrade) {
      options.gradeName = this.selectedGrade.name
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

    console.log("before filter " + JSON.stringify(this.exams));

    console.log("gradeName " + options.gradeName);
    console.log("subjectName " + options.subjectName);
    console.log("examName " + options.examName);

    // filter our data
    const temp = this.exams.filter(function(d) {
      return d.gradeName.indexOf(options.gradeName) !== -1
        && d.subName.indexOf(options.subjectName) !== -1
        && d.examName.indexOf(options.examName) !== -1;
    });

    console.log("after filter " + JSON.stringify(temp));
    this.result.emit(temp)
  }
}
