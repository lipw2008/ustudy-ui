import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import {ExamService} from '../exam/exam.service';

declare var $: any;

@Component({
  templateUrl: 'welcome.component.html'
})

export class WelcomeComponent {

  constructor(public _sharedService: SharedService, public _examService: ExamService, private router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.updateUserStatus();
  }

  ngAfterViewInit() {
  }

  route(target): void {
    console.log("check log in status " + target);
    if (this._sharedService.userName === '') {
      this.router.navigate(['login']);
    } else if (target == undefined) {
      alert("您没有操作相关功能的权限！");
    } else {
      let parm = [];
      parm.push('/' + target);
      this.router.navigate(parm);
    }
  }

  updateUserStatus() {
    this._sharedService.makeRequest('GET', '/api/loginId', '').then((data: any) => {
      console.log("data: " + data);
      this._sharedService.userName = data.userName === undefined ? '' : data.userName;
      this._sharedService.userRole = data.role === undefined ? '' : data.role;
      this._sharedService.orgId = data.orgId === undefined ? '' : data.orgId;
      console.log("loginId success: user:" + this._sharedService.userName + " role:" + this._sharedService.userRole);
      setTimeout(() => {
        this.masonry();
      }, 1);
      //this.masonry();
      //alert("已登录！");
      // reload
      this._examService.initexamOptions()
    }).catch((error: any) => {
      this._sharedService.userName = '';
      this._sharedService.userRole = '';
      console.log("loginId failed: user:" + this._sharedService.userName + " role:" + this._sharedService.userRole);
      console.log(error.status);
      console.log(error.statusText);
      //this.masonry();
      setTimeout(() => {
        this.masonry();
      }, 1);
    });
  }

  masonry() {
    //扁平化布局
    $('.grid').masonry({
      itemSelector: '.grid-item'
    });
    console.log("masonry is called");
  }
}
