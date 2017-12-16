import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../exam/exam.service';
import { sprintf } from 'sprintf-js';
import * as _ from 'lodash';

@Component({
  selector: 'app-unfinished-exam-details',
  templateUrl: './unfinished-exam-details.component.html',
  styleUrls: ['./unfinished-exam-details.component.css']
})
export class UnfinishedExamDetailsComponent implements OnInit {
  @ViewChild('examTable') table: any;
  private examId: any;
  private subjects = [];
  private temp = [];

  columns = [
    { prop: 'subjectName', name: '科目' },
    { name: '试卷' },
    { name: '答案' },
    { name: '答题卡' },
    { name: '模板制作' },
    { name: '客观题' },
    { name: '主观题' },
    { name: '任务分配' },
    { name: '阅卷' },
  ];

  constructor(private route: ActivatedRoute, private _examService: ExamService) { }

  ngOnInit() {
    this.examId = this.route.snapshot.params.examId;
    this._examService.getExamDetails(this.examId).then((data: any) => {
      for (const grade of data) {
        grade.subjects.forEach((subject) => {
          subject.gradeId = grade.gradeId;
          subject.gradeName = grade.gradeName;
          subject.studentCount = grade.studentCount;
        })
      }
      const subjects = _.concat.apply(this, _.map(data, 'subjects'));
      this.temp = [...subjects];
      this.subjects = subjects;
    })
  }

  getExamProgress(subject) {
    return sprintf('%.2f%%', subject.paperCount / subject.studentCount * 100)
  }

  toggleExpandGroup(group) {
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  test(row) {
    console.log(row)
  }
}
