import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TeacherService } from './teacher.service';
import { SharedService } from '../../shared.service';

@Component({
  templateUrl: 'add-teacher.component.html'
})

export class AddTeacherComponent implements OnInit {

  public addForm: FormGroup;

  errorMessage: string;

  teacher = {
    "teacherId": "",
    "teacherName": "",
    "grades": [{ "id": "", "name": null, subjects: [{"id": "", "name": null}]}],
    "roles": [{ "id": "", "name": null }]
  };

  inputGrade: string;

  inputSubject: string;

  inputRole: string;

  properties = {
    grades: [],
    roles: []
  }

  constructor(private _teacherService: TeacherService, private _sharedService: SharedService, public fb: FormBuilder, private router: Router) {

  }

  cancel(event) {
    this.router.navigate(['teacherList']);
  }

  add(event) {
    if (this.addForm.status == "INVALID") {
      alert("信息不完整");
      return;
    }
    for (let grade of this.properties.grades) {
      if (grade.name === this.inputGrade) {
        this.teacher.grades[0].id = grade.id;
        for (let subject of grade.subjects) {
          if (subject.name === this.inputSubject) {
            this.teacher.grades[0].subjects[0].id = subject.id;
            break;
          }
        }
        break;
      }
    }
    for (let role of this.properties.roles) {
      if (role.name === this.inputRole) {
        this.teacher.roles[0].id = role.id;
        break;
      }
    }

    this._sharedService.makeRequest('POST', '/info/teacher/add', JSON.stringify(this.teacher)).then((data: any) => {
      alert("添加成功");
      //go back to the teacher list page
      this.router.navigate(['teacherList']);
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
      alert("添加失败！");
      //go back to the teacher list page
      this.router.navigate(['teacherList']);
    });
  }

  ngOnInit(): void {
//    this.teacher = this._teacherService.getDefaultTeacher();

    this.addForm = this.fb.group({
      teacherId: ["", Validators.required],
      teacherName: ["", Validators.required],
      grade: ["", Validators.required],
      subject: ["", Validators.required],
      role: ["", Validators.required]
    });

    this.reload();
  }

  reload() {
    //this._sharedService.makeRequest('GET', 'assets/api/teachers/properties.json', '').then((data: any) => {
    this._sharedService.makeRequest('GET', '/info/school/gsr/', '').then((data: any) => {
      //cache the list
      console.log("data: " + JSON.stringify(data));
      this.properties = data;
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }  
}
