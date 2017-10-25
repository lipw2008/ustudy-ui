import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IStudent } from './student';
import { StudentService } from './student.service';
import { SharedService } from '../../shared.service';

@Component({
  templateUrl: 'student-list.component.html'
})

export class StudentListComponent implements OnInit {

  public searchForm = this.fb.group({
    studentName: [''],
    gradeName: [''],
    className: [''],
    type: ['']
  });

  errorMessage: string;

  students: IStudent[];

  grades = [];

  classes = [];

  types = [];

  rows = [];

  temp = [];

  selected = [];

  columns = [
    { prop: 'studentName', name: '姓名' },
    { prop: 'grade', name: '年级' },
    { prop: 'class', name: '班级' }
  ];

  // filter keys:
  grade = '';
  class = '';
  studentType = '';
  studentName = '';

  constructor(private _studentService: StudentService, private _sharedService: SharedService, public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.reload();
    this.grades = this._studentService.getGrades();
    this.classes = this._studentService.getClasses();
    this.types = this._studentService.getTypes();
  }

  reload() {
    this._sharedService.makeRequest('GET', '/info/student/list/0', '').then((data: any) => {
      //cache the list
      console.log('data: ' + JSON.stringify(data));
      this.temp = [...data];
      this.rows = data;
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

  filter(event) {
    // const gradeName = this.elm.nativeElement.querySelector('#gradeFilterValue').value;
    // const className = this.elm.nativeElement.querySelector('#classFilterValue').value;
    // const type = this.elm.nativeElement.querySelector('#typeFilterValue').value;
    // const studentName = this.elm.nativeElement.querySelector('#studentNameFilterValue').value;

    // filter our data
    const t = this;
    const temp = this.temp.filter(function(d) {
      return d.grade.indexOf(t.grade) !== -1
        && d.class.indexOf(t.class) !== -1
        && d.type.indexOf(t.studentType) !== -1
        && d.studentName.indexOf(t.studentName) !== -1;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }

  removeStudent(event) {
    const ids = [];
    console.log('length:' + this.selected.length);
    for (const s of this.selected) {
      const id = { 'id': '' };
      id.id = s.id;
      console.log('remove students:' + id.id);
      ids.push(id);
    }

    console.log('remove students:' + JSON.stringify(ids));
    this.remove(JSON.stringify(ids));
  }

  remove(ids) {

    this._sharedService.makeRequest('POST', '/info/student/delete', ids).then((data: any) => {
      this.reload();
      alert('删除成功！');
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
      alert('删除失败！');
    });
  }

  updateStudent(id) {
    console.log('update student: ' + id);
  }
}
