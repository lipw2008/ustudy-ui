import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import {TeacherService} from '../../../info/teachers/teacher.service';

type AOA = Array<Array<any>>;
@Component({
  selector: 'app-add-teacher-batch',
  templateUrl: './add-teacher-batch.component.html',
  styleUrls: ['./add-teacher-batch.component.css']
})
export class AddTeacherBatchComponent implements OnInit {
  @ViewChild('teacherTable') table: any;
  data: AOA = [[]];
  data1: [any];
  teachers = [];
  teacherId: string;
  teacherName: string;
  gradeName: any;
  className: any;
  subjectName: any;

  constructor(public bsModalRef: BsModalRef, private _teacherService: TeacherService) { }

  ngOnInit() {
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
        _.forEach(this.data.slice(1), (row) => {
          const teacher = Object.create({});
          // [{stuName: this.name, stuId: this.stuId, stuExamId: this.stuExamId, classId: this.examineeClass.classId,
          teacher.teacherName = row[0];
          teacher.subjectName = row[1];
          teacher.gradeName = row[2];
          teacher.className = row[3];
          teacher.teacherId = row[4];
          this.teachers.push(teacher)
        });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  test() {
    console.log(1)
  }

  submit() {
    this._teacherService.addOrUpdateTeacher(this.teachers).then((data) => {
      alert(`批量新建教师成功`);
      this.bsModalRef.hide()
    });
  }
}
