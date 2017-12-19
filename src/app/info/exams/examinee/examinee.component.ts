import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExamService} from "../../../exam/exam.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-examinee',
  templateUrl: './examinee.component.html',
  styleUrls: ['./examinee.component.css']
})
export class ExamineeComponent implements OnInit {
  @ViewChild('examineeTable') table: any;
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


  constructor(private route: ActivatedRoute, private _examService: ExamService, public fb: FormBuilder) {
  }

  ngOnInit() {
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
      this.classes = data.classes;
    })
  }

  addExaminee(modal) {
    if (!this.name || !this.stuExamId || !this.examineeClass) {
      alert('请输入必填内容');
      return
    }
    this._examService.addExaminee([{stuName: this.name, stuId: this.stuId, stuExamId: this.stuExamId, classId: this.examineeClass.classId}]).then((data) => {
      alert('新建考生成功');
    });
    modal.hide()
  }
}
