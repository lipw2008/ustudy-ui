import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ExamService} from '../../../exam/exam.service';
import * as _ from 'lodash';
import {SharedService} from '../../../shared.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AddExamineeBatchComponent} from '../../../utils/modals/add-examinee-batch/add-examinee-batch.component';

@Component({
  selector: 'app-examinee',
  templateUrl: './examinee.component.html',
  styleUrls: ['./examinee.component.css']
})
export class ExamineeComponent implements OnInit {
  @ViewChild('examineeTable') table: any;
  bsModalRef: BsModalRef;
  examId: any;
  gradeId: any;
  text: string;
  selectedClass: any;

  temp = [];
  examinees = [];
  classes: any[];
  columns = [
    { prop: 'studentName', name: '考生' },
    { prop: 'examCode', name: '考号' },
    // { prop: 'className', name: '班级' },
    { name: '操作' },
  ];

  // for new examinee
  name: string;
  stuId: string;
  stuExamId: string;
  examineeClass: any;
  examineeId: any;


  constructor(private route: ActivatedRoute, private _examService: ExamService, public fb: FormBuilder, private _sharedService: SharedService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    if (!this._sharedService.checkPermAndRedirect('考试信息')) {
      return
    }
    this.examId = this.route.snapshot.params.examId;
    this.gradeId = this.route.snapshot.params.gradeId;
    this.reload();
  }

  reload() {
    const params = Object.create({});
    if (this.text) {
      params.text = this.text
    }
    if (this.selectedClass) {
      params.classId = this.selectedClass.id
    }
    this._examService.getExaminees(this.examId, this.gradeId, params).then((data: any) => {
      console.log('111', data);
      const examinees = data.students;
      this.temp = [...examinees];
      this.examinees = examinees;
    });
    this._examService.getClasses(this.gradeId).then((data: any) => {
      this.classes = data;
    })
  }

  addOrUpdateExaminee(modal) {
    if (!this.name || !this.stuExamId || !this.examineeClass) {
      alert('请输入必填内容');
      return
    }
    this._examService.addOrUpdateExaminee([{stuName: this.name, stuId: this.stuId, stuExamId: this.stuExamId, classId: this.examineeClass.classId,
      examId: this.examId, gradeId: this.gradeId}]).then((data) => {
      alert(`${this.examineeId ? '更新' : '新建'}考生成功`);
      if (this.examineeId) {
        const examinee = _.find(this.examinees, {studentId: this.examineeId});
        examinee.studentName = this.name;
        examinee.stuId = this.stuId;
        examinee.stuExamId = this.stuExamId;
        examinee.className = this.examineeClass.className;
        examinee.classId = this.examineeClass.classId;
      }
      modal.hide()
    });
  }

  deleteExaminee(examinee) {
    this._examService.deleteExaminee(examinee.studentId).then((data) => {
      alert('删除考生成功');
      _.remove(this.examinees, examinee)
    });
  }

  editExaminee(modal, examinee) {
    this.name = examinee.studentName;
    this.stuExamId = examinee.examCode;
    this.examineeClass = _.find(this.classes, {classId: examinee.classId});
    this.examineeId = examinee.studentId;
    modal.show()
  }

  addExamineeBatch() {
    this.bsModalRef = this.modalService.show(AddExamineeBatchComponent);
    this.bsModalRef.content.gradeId = this.gradeId;
    this.bsModalRef.content.examId = this.examId;
  }
}
