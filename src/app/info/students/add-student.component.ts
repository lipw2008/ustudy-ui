import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IStudent } from './student';
import { StudentService } from './student.service';
import { SharedService } from '../../shared.service';

@Component({
  templateUrl: 'add-student.component.html'
})

export class AddStudentComponent implements OnInit {

  public addForm: FormGroup;

  errorMessage: string;

  student: IStudent = {
    "studentId": "",
    "studentName": "",
    "grade": "",
    "class": "",
    "type": "",
    "isTemp": false
  };

  grades = [];

  classes = [];

  types = [];

  constructor(private _studentService: StudentService, private _sharedService: SharedService, public fb: FormBuilder, private router: Router) {

  }

  cancel(event) {
    this.router.navigate(['studentList']);
  }

  add(event) {
    if (this.addForm.status == "INVALID") {
      alert("信息不完整");
      return;
    }

    this._sharedService.makeRequest('POST', '/info/student/add', JSON.stringify(this.student)).then((data: any) => {
      alert("添加成功");
      //go back to the teacher list page
      this.router.navigate(['studentList']);
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
      alert("添加失败！");
      //go back to the teacher list page
      this.router.navigate(['studentList']);
    });
  }

  ngOnInit(): void {
    this.student = this._studentService.getDefaultStudent();

    this.addForm = this.fb.group({
      studentId: ["", Validators.required],
      studentName: ["", Validators.required],
      gradeName: ["", Validators.required],
      className: ["", Validators.required],
      typeName: ["", Validators.required],
      isTemp: [false, Validators.required]
    });

    this.grades = this._studentService.getGrades();
    this.classes = this._studentService.getClasses();
    this.types = this._studentService.getTypes();
  }
}
