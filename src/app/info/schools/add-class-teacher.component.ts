import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SchoolService } from './school.service';
import { SharedService } from '../../shared.service';

@Component({
  templateUrl: 'add-class-teacher.component.html'
})

export class AddClassTeacherComponent implements OnInit {

  errorMessage: string;

  class: any;

  selectedTeacher: any = { 'teacherId': '', 'teacherName': '' };

  teachers = [];

  temp = [];

  grades = [];
  subjects = [];

  subjectName = '';
  gradeName = '';
  teacherName = '';

  departmentName = '';
  gradeId = '';
  classId = '';

  endpoints = { '高中部': 'high', '初中部': 'junior', '小学部': 'primary', '其他': 'other' };

  constructor(private _schoolService: SchoolService, private _sharedService: SharedService, private route: ActivatedRoute, private router: Router) {

  }

  cancel(event) {
    this.router.navigate(['updateClass', { departmentName: this.departmentName, gradeId: this.gradeId, classId: this.classId }]);
  }

  update(event) {
    if (this.route.snapshot.params.subject) {
      for (const subject of this.class.subjects) {
        if (subject.subject === this.route.snapshot.params.subject) {
          subject.teacher.id = this.selectedTeacher.teacherId;
          subject.teacher.n = this.selectedTeacher.teacherName;
          const option = { 'id': '', 'value': '' };
          option.id = this.selectedTeacher.teacherId;
          option.value = this.selectedTeacher.teacherName;
          subject.options.push(option);
          break;
        }
      }
      this._schoolService.setPersistData(this.class);
      this.router.navigate(['updateClass', { departmentName: this.departmentName, gradeId: this.gradeId, classId: this.classId, 'otherClassTeacher': 'true' }]);
    } else {
      const otherClassOwner = { 'id': '', 'n': '' };
      otherClassOwner.id = this.selectedTeacher.teacherId;
      otherClassOwner.n = this.selectedTeacher.teacherName;
      this.class.otherClassOwner = otherClassOwner;
      this.class.classOwner = otherClassOwner;
      this._schoolService.setPersistData(this.class);
      this.router.navigate(['updateClass', { departmentName: this.departmentName, gradeId: this.gradeId, classId: this.classId, 'otherClassOwner': 'true' }]);
    }

  }

  ngOnInit(): void {
    this.departmentName = this.route.snapshot.params.departmentName;
    this.gradeId = this.route.snapshot.params.gradeId;
    this.classId = this.route.snapshot.params.classId;
    this.grades = this._schoolService.getGrades();
    this.subjects = this._schoolService.getSubjects();
    this.class = this._schoolService.getPersistData();
    this.loadTeachers();
  }

  filter(event) {
    const t = this;
    const temp = this.temp.filter(function(d) {
      let ret = false;
      for (const grade of d.grades) {
        if (grade.n.indexOf(t.gradeName) !== -1) {
          ret = true;
          break;
        }
      }
      if (ret === false) {
        return ret;
      } else {
        ret = false;
      }

      for (const subject of d.subjects) {
        if (subject.n.indexOf(t.subjectName) !== -1) {
          ret = true;
          break;
        }
      }
      if (ret == false) {
        return ret;
      } else {
        ret = false;
      }

      if (d.teacherName.indexOf(t.teacherName) !== -1) {
        ret = true;
      }

      return ret;
    });
    this.teachers = temp;
  }

  loadTeachers() {
    //get department teachers
    //req.open('GET', 'assets/api/teachers/teachers.json');
    this._sharedService.makeRequest('GET', '/info/school/departteac/' + this.endpoints[this.departmentName], '').then((data: any) => {
      //cache the list
      console.log('data: ' + JSON.stringify(data));
      this.teachers = data;
      this.temp = data;
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }
}
