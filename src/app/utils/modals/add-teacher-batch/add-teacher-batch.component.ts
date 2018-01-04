import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import {TeacherService} from '../../../info/teachers/teacher.service';
import {ExamService} from '../../../exam/exam.service';

type AOA = Array<Array<any>>;
@Component({
  selector: 'app-add-teacher-batch',
  templateUrl: './add-teacher-batch.component.html',
  styleUrls: ['./add-teacher-batch.component.css']
})
export class AddTeacherBatchComponent implements OnInit {
  examOptions: any;

  @ViewChild('teacherTable') table: any;
  data: AOA = [[]];
  data1: [any];
  teachers = [];
  teacherRows = [];

  constructor(public bsModalRef: BsModalRef, private _teacherService: TeacherService, private _examService: ExamService) { }

  ngOnInit() {
    this._examService.getExamOptions().then((data) => {
      this.examOptions = data;
    });
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
          let teacherRow = {
            "teacherId": "",
            "teacherName": "",
            "gradeName": "",
            "subjectName": ""            
          }
          let teacher = {
            "teacherId": "",
            "teacherName": "",
            "grades": [{ "id": "", "name": null}],
            "subjects": [{"id": "", "name": null}],
            "roles": [{ "id": "", "name": null }]
          };
          teacher.teacherName = row[0];
          teacherRow.teacherName = row[0];
          for (let grade of this.examOptions.grades) {
            if (row[2] === grade.name) {
              teacher.grades[0].id = grade.id;
              teacher.grades[0].name = grade.name;
              teacherRow.gradeName = grade.name;
              for(let subject of grade.subjects) {
                if (row[1] === subject.name) {
                  teacher.subjects[0].id = subject.id;
                  teacher.subjects[0].name = subject.name;
                  teacherRow.subjectName = subject.name;
                  break;
                }
              }
              break;
            }
          }
          for (let role of this.examOptions.roles) {
            if ('任课老师' === role.name) {
              teacher.roles[0].id = role.id;
              teacher.roles[0].name = role.name;
            }
          }
          teacher.teacherId = row[4];
          teacherRow.teacherId = row[4];
          this.teachers.push(teacher);
          this.teacherRows.push(teacherRow);
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
