import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ITeacher } from './teacher';
import { TeacherService } from './teacher.service';
import { SharedService } from '../../shared.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AddTeacherBatchComponent} from '../../utils/modals/add-teacher-batch/add-teacher-batch.component';

@Component({
  templateUrl: 'teacher-list.component.html'
})

export class TeacherListComponent implements OnInit {
  
  bsModalRef: BsModalRef;
  subscription: Subscription;

  public searchForm = this.fb.group({
    teacherNameId: [""],
    grade: [""],
    subject: [""],
    role: [""]
  });

  errorMessage: string;

  properties = {
    grades: [],
    roles: []
  }

  rows = [];

  temp = [];

  selected = [];

  columns = [
    { prop: 'teacherName', name: '姓名' },
    { prop: 'teacherId', name: '手机号' },
    { prop: 'subjects', name: '学科' },
    { prop: 'classes', name: '授课班级' },
    { prop: 'roles', name: '账号类型' }
  ];

  // filter keys:
  grade = "";
  subject = "";
  role = "";
  teacherNameId = "";

  constructor(private _teacherService: TeacherService, private _sharedService: SharedService, public fb: FormBuilder, private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.reload();
    this._teacherService.getGsr().then((data: any)=> {
      this.properties = data;
    }).catch((error: any)=>{
      alert("无法加载年级，学科及角色列表！");
    });
  }

  reload() {
    //req.open('GET', 'assets/api/teachers/teachers.json');
    this._sharedService.makeRequest('GET', '/info/teacher/list/0', '').then((data: any) => {
      //cache the list
      console.log("data: " + JSON.stringify(data));
      for (var t of data) {
        //账号
        if (t.roles && t.roles.length > 0) {
          var str = "";
          for (var r of t.roles) {
            str += r.name + " ";
          }
          t.roles = str;
        } else {
          t.roles = "";
        }
        //科目
        if (t.subjects && t.subjects.length > 0) {
          var str = "";
          for (var s of t.subjects) {
            str += s.name + " ";
          }
          t.subjects = str;
          console.log("subjects: " + t.subjects);
        } else {
          t.subjects = "";
        }
        //年级
        if (t.grades && t.grades.length > 0) {
          var str = "";
          for (var g of t.grades) {
            str += g.name + " ";
          }
          t.grades = str;
        } else {
          t.grades = "";
        }
        //班级
        if (t.classes && t.classes.length > 0) {
          var str = "";
          for (var c of t.classes) {
            str += c.name + " ";
          }
          t.classes = str;
        } else {
          t.classes = "";
        }
      }
      this.temp = [...data];
      this.rows = data;
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

  filter(event) {
    // filter our data
    var t = this;
    const temp = this.temp.filter(function(d) {
      return d.grades.indexOf(t.grade) !== -1
        && d.subjects.indexOf(t.subject) !== -1
        && d.roles.indexOf(t.role) !== -1
        && (d.teacherName.indexOf(t.teacherNameId) !== -1 || d.teacherId.indexOf(t.teacherNameId) !== -1);
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }

  removeTeacher(event) {
    var ids = [];
    console.log("length:" + this.selected.length);
    for (var s of this.selected) {
      var id = { "id": "" };
      id.id = s.id;
      console.log("remove teachers:" + id.id);
      ids.push(id);
    }

    console.log("remove teachers:" + JSON.stringify(ids));
    this.remove(JSON.stringify(ids));
  }

  remove(ids) {
    this._sharedService.makeRequest('POST', '/info/teacher/delete', ids).then((data: any) => {
      this.selected = [];
      this.reload();
      alert("删除成功！");
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
      alert("删除失败！");
    });
  }

  addTeacherBatch() {
    this.subscription = this.modalService.onHide.subscribe((reason:string) => {
      console.log("modal is hidden!!");
      this.reload();
      this.unsubscribe();
    });

    this.bsModalRef = this.modalService.show(AddTeacherBatchComponent);
    // this.bsModalRef.content.gradeId = this.gradeId;
    // this.bsModalRef.content.examId = this.examId;
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

}
