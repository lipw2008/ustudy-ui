import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SchoolService } from './school.service';
import { SharedService } from '../../shared.service';

@Component({
  templateUrl: 'update-class.component.html'
})

export class UpdateClassComponent implements OnInit {

  errorMessage: string;

  classId: string;
  gradeId: string;
  departmentName: string;

  class: any = {
    classType: "",
    classOwner: { "id": "", "n": "" },
    otherClassOwner: { "id": "", "n": "" }
  };

  teachers = [];

  constructor(private _schoolService: SchoolService, private _sharedService: SharedService, private route: ActivatedRoute, private router: Router) {

  }

  addClassTeacher(subjectName) {
    this._schoolService.setPersistData(this.class);
    if (subjectName !== '') {
      this.router.navigate(['addClassTeacher', { departmentName: this.departmentName, gradeId: this.gradeId, classId: this.classId, subject: subjectName }]);
    } else {
      this.router.navigate(['addClassTeacher', { departmentName: this.departmentName, gradeId: this.gradeId, classId: this.classId }]);
    }
  }

  cancel(event) {
    this.teachers = [];
    this._schoolService.resetPersistData();
    this.router.navigate(['class', { departmentName: this.departmentName, gradeId: this.gradeId }]);
  }

  update(event) {
    for (let subject of this.class.subjects) {
      delete subject.options;
    }
    this._sharedService.makeRequest('POST', '/info/school/class/update/', JSON.stringify(this.class)).then((data: any) => {
      alert("修改成功");
      //go back to the student list page
      //this.router.navigate(['class', { departmentName: this.departmentName, gradeId: this.gradeId }]);
      this.router.navigate(['schoolDetails']);
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
      alert("修改失败！");
      //go back to the student list page
      //this.router.navigate(['class', { departmentName: this.departmentName, gradeId: this.gradeId }]);
      this.router.navigate(['schoolDetails']);
    });
  }

  ngOnInit(): void {
    this.departmentName = this.route.snapshot.params.departmentName;
    this.gradeId = this.route.snapshot.params.gradeId;
    this.classId = this.route.snapshot.params.classId;

    if (this.route.snapshot.params.otherClassTeacher) {
      this.class = this._schoolService.getPersistData();
    } else if (this.route.snapshot.params.otherClassOwner) {
      this.class = this._schoolService.getPersistData();
    } else {
      this.loadClass();
    }
  }

  loadClass() {
    //req.open('GET', 'assets/api/schools/class.json');
    this._sharedService.makeRequest('GET', '/info/school/class/' + this.classId, '').then((data: any) => {
      //cache the list
      console.log("data: " + JSON.stringify(data));
      this.class = data;
      this.loadTeachers();
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

  loadTeachers() {
    //req.open('GET', 'assets/api/teachers/classTeachers.json');
    this._sharedService.makeRequest('GET', '/info/school/gradeteac/' + this.gradeId, '').then((data: any) => {
      //cache the list
      console.log("data: " + JSON.stringify(data));
      this.teachers = data;
      for (let subject of this.class.subjects) {
        subject.options = [];
        for (let teacher of this.teachers) {
          let t = { "id": "", "value": "" }
          t.id = teacher.teacherId;
          t.value = teacher.teacherName;
          for (let ts of teacher.subjects) {
            if (ts.n === subject.subject)
              subject.options.push(t);
          }
        }
      }
      console.log("subjects: " + JSON.stringify(this.class.subjects));
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }
}
