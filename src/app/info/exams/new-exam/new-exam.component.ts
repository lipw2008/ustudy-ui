import { Component, OnInit } from '@angular/core';
import { ExamService   } from '../../../exam/exam.service';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../exam/task/task.service';
import {SharedService} from '../../../shared.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {
  examOptions: any;
  grades = [];
  name = '';
  date: any;
  datePipe = new DatePipe('en-US');
  examId: any;

  constructor(private _examService: ExamService, private _location: Location, private route: ActivatedRoute, private _taskService: TaskService,
              private _sharedService: SharedService) { }

  ngOnInit() {
    if (!this._sharedService.checkPermAndRedirect('考试信息')) {
      return
    }
    this.examId = this.route.snapshot.params.examId;
    this._examService.getExamOptions().then((data) => {
      this.examOptions = data;
      if (this.examId) {
        this._examService.getExam(this.examId).then((exam: any) => {
          this.name = exam.examName;
          this.date = exam.examDate
        });
        this._taskService.getExamSubjects(this.examId).then((egss: any) => {
          for (const grade of egss) {
            for (const subject of grade.subjects) {
              subject.id = subject.subId;
              this.trigger(grade, subject)
            }
          }
        })
      }
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
    const selected =  _.includes(_.get(_.find(this.grades, {id: grade.id}), 'subjectIds'), subject.subId || subject.id);
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
    const grades = _.cloneDeep(this.grades);
    for (const grade of grades) {
      _.forEach(grade, (v, k) => {
        if (k !== 'id' && k !== 'subjectIds') {
          delete grade[k]
        }
      })
    }
    params.grades = grades;

    this._examService.createOrUpdateExam(params, this.examId).then((data) => {
      alert(`${this.examId ? '更新' : '新建'}考试成功`);
      this.back()
    })
  }
}
