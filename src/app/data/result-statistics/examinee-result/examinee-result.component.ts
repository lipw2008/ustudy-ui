import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {ExamService} from '../../../exam/exam.service';
import { sprintf } from 'sprintf-js';
import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-examinee-result',
  templateUrl: './examinee-result.component.html',
  styleUrls: ['./examinee-result.component.css']
})
export class ExamineeResultComponent implements OnInit {
  @ViewChild('examineeTable') table: any;
  tab = 'examinee';
  exams: Promise<any>;
  exgrs: Promise<any>;
  selectedExam: any;
  selectedExgr: any;
  selectedGrade: any;
  selectedSubject: any;
  selectedClass: any;
  results = [];
  text = '';

  columns = [
    { prop: 'name', name: '姓名' },
  ];
  resultHdr: any;
  temp: any;
  subjectWidth: any;
  subjectWidth2: any;
  examOptions: any;
  selectedBranch = '全部';
  selectedExamineeDetails: any;
  examId: number;

  constructor(private _dataService: DataService, private _examService: ExamService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.examId = Number(this.route.snapshot.params.examId);
    const params = Object.create({});
    params.finished = true;
    this.exams = this._examService.filterExams(params);
    this.exgrs = this._examService.filterExgr({});
    this._examService.getExamOptions().then((data) => {
      this.examOptions = data;
    });
    this.exams.then((data) => {
      if (this.examId) {
        this.selectedExam = _.find(data, {id: this.examId});
      }
      if (!this.selectedExam) {
        this.selectedExam = _.first(data);
        if (this.examId) {
          alert('考试未找到')
        }
      }
      this.reload()
    })
    this.exgrs.then((data) => {
      if (this.examId) {
        this.selectedExgr = _.find(data, {examId: this.examId});
      }
      if (!this.selectedExgr) {
        this.selectedExgr = _.first(data);
      }
    })
  }

  private reload() {
    const params = Object.create({});
    if (_.isObject(this.selectedGrade)) {
      params.gradeId = this.selectedGrade.id
    } else {
      this.selectedGrade = ""
    }
    if (_.isObject(this.selectedSubject)) {
      params.subjectId = this.selectedSubject.id
    } else {
      this.selectedSubject = ""
    }
    if (_.isObject(this.selectedClass)) {
      params.classId = this.selectedClass.id
    } else {
      this.selectedClass = ""
    }
    if (this.text) {
      params.text = this.text
    }
    if (this.selectedBranch !== '全部') {
      params.branch = this.selectedBranch
    }
    this._dataService.getStudentResultList(this.selectedExam.id, params).then((data: any) => {
      this.temp = [...data];
      this.results = data;
      this.resultHdr = data[0];      
      if (!this.resultHdr) {
        this.subjectWidth = sprintf('%.2f%%', 100);
        this.subjectWidth2 = sprintf('%.2f%%', 50);
        return;
      }
      this.subjectWidth = sprintf('%.2f%%', 1 / (this.resultHdr.scores.length + 1) * 100);
      this.subjectWidth2 = sprintf('%.2f%%', 0.5 / (this.resultHdr.scores.length + 1) * 100);
    })
  }

  onClick(event, modal) {
    if (event.type === 'click') {
      this._dataService.getExamineeDetails(event.row.examId, event.row.stuExamId).then((data) => {
        this.selectedExamineeDetails = data;
        modal.show()
      });
    }
  }

  parseObjectives(subject) {
    return _.map(_.filter(subject.objectives, (obj) => obj.score > 0), 'quesno').join('、 ')
  }

  parseSubjectives(subject) {
    return _.map(subject.subjectives, (question: any) => `${question.quesno}题：${question.score}分`).join('; ')
  }
}
