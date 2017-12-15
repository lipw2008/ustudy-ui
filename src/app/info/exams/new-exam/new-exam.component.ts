import { Component, OnInit } from '@angular/core';
import { ExamService   } from '../../../exam/exam.service';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {
  private examOptions: any;
  private grades = [];
  private name = '';
  private date: any;
  datePipe = new DatePipe('en-US');

  constructor(private _examService: ExamService, private _location: Location) { }

  ngOnInit() {
    this._examService.getExamOptions().then((data) => {
      this.examOptions = data
    });
  }

  trigger(grade, subject) {
    const g = _.find(this.grades, {id: grade.id});
    if (g) {
      if (_.includes(g.subjectIds, subject.id)) {
        g.subjectIds = _.without(g.subjectIds, subject.id)
      } else {
        g.subjectIds.push(subject.id)
      }
    } else {
      if (!grade.subjectIds) {
        grade.subjectIds = [subject.id]
      } else {
        if (_.includes(grade.subjectIds, subject.id)) {
          grade.subjectIds = _.without(grade.subjectIds, subject.id)
        } else {
          grade.subjectIds.push(subject.id)
        }
      }
      this.grades.push(grade)
    }
    console.log('grades: ', this.grades)
  }

  getClass(grade, subject) {
    const selected =  _.includes(_.get(_.find(this.grades, grade), 'subjectIds'), subject.id);
    if (selected) {
      return 'btn-primary'
    } else {
      return 'btn-default'
    }
  }

  back() {
    this._location.back()
  }

  submit() {
    const params = Object.create({});
    if (!this.name || !this.date || _.isEmpty(this.grades)) {
      alert('信息不完整，请填写');
      return
    }
    params.examName = this.name;
    params.examDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    params.type = '校考';
    params.status = '0';
    params.grades = this.grades;

    this._examService.createExam(params).then((data) => {
      alert('新建考试成功');
      this.back()
    })
  }
}
