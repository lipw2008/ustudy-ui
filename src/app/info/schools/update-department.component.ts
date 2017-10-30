import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SchoolService } from './school.service';
import { SharedService } from '../../shared.service';

@Component({
  templateUrl: 'update-department.component.html'
})

export class UpdateDepartmentComponent implements OnInit {

  errorMessage: string;

  departmentName: string;

  subjects = [];

  teachers = [];

  endpoints = { "高中部": "high", "初中部": "junior", "小学部": "primary", "其他": "other" };

  constructor(private _schoolService: SchoolService, private _sharedService: SharedService, private route: ActivatedRoute, private router: Router) {

  }

  cancel(event) {
    this.subjects = [];
    this.teachers = [];
    this.router.navigate(['department', { departmentName: this.departmentName }]);
  }

  update(event) {
    for (let subject of this.subjects) {
      subject.owners = [];
      for (let option of subject.options) {
        if (option.selected === true) {
          let owner = { "id": option.id, "n": option.value };
          subject.owners.push(owner);
        }
      }
      delete subject.options;
    }
    this._sharedService.makeRequest('POST', '/info/school/departsubs/update/' + this.endpoints[this.departmentName], JSON.stringify(this.subjects)).then((data: any) => {
      this.subjects = [];
      this.teachers = [];
      alert("修改成功");
      //go back to the depart list page
      this.router.navigate(['department', { departmentName: this.departmentName }]);
    }).catch((error: any) => {
      this.subjects = [];
      this.teachers = [];
      console.log(error.status);
      console.log(error.statusText);
      alert("修改失败！");
      //go back to the student list page
      this.router.navigate(['department', { departmentName: this.departmentName }]);
    });
  }

  ngOnInit(): void {

    this.departmentName = this.route.snapshot.params.departmentName;

    if (this.route.snapshot.params.subject) {
      console.log("subject routed:" + this.route.snapshot.params.subject);
      let subject = JSON.parse(this.route.snapshot.params.subject);
      this.subjects.push(subject);
      this.loadTeachers();
    } else {
      this.loadSubjects();
    }
  }

  loadSubjects() {
    //req.open('GET', 'assets/api/schools/subjects.json');
    this._sharedService.makeRequest('GET', '/info/school/departsubs/' + this.endpoints[this.departmentName], '').then((data: any) => {
      //cache the list
      console.log("data: " + JSON.stringify(data));
      this.subjects = data;
      this.loadTeachers();
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

  loadTeachers() {
    //get department teachers
    //req.open('GET', 'assets/api/teachers/teachers.json');
    this._sharedService.makeRequest('GET', '/info/school/departteac/' + this.endpoints[this.departmentName], '').then((data: any) => {
      //cache the list
      console.log("data: " + JSON.stringify(data));
      this.teachers = data;
      for (let subject of this.subjects) {
        subject.options = [];
        for (let teacher of this.teachers) {
          let ret = false;
          for (let ts of teacher.subjects) {
            if (ts.n === subject.subject) {
              ret = true;
              break;
            }
          }
          if (ret === true) {
            let t = { "id": "", "value": "", "selected": false }
            t.id = teacher.teacherId;
            t.value = teacher.teacherName;
            for (let owner of subject.owners) {
              if (t.id === owner.id) {
                t.selected = true;
                break;
              }
            }
            subject.options.push(t);
          }
        }
      }
      console.log("subjects: " + JSON.stringify(this.subjects));
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }
}
