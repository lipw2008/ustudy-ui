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
    this.showTime();
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

  showTime() {
    var time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var second = time.getSeconds();
    var weekDay = new Array(7);  
    weekDay[0] = "星期日";  
    weekDay[1] = "星期一";  
    weekDay[2] = "星期二";  
    weekDay[3] = "星期三";  
    weekDay[4] = "星期四";  
    weekDay[5] = "星期五";  
    weekDay[6] = "星期六";  
    //month < 10 ? month = '0' + month : month;
    //month = month + 1;
    //hour < 10 ? hour = '0' + hour : hour;
    //minutes < 10 ? minutes = '0' + minutes : minutes;
    //second < 10 ? second = '0' + second : second;
    //var now_time = year + '年' + month + '月' + date + '日' + ' ' + weekDay[day] + ' ' + hour + ':' + minutes + ':' + second;
    var nowDate = date;
    var nowWeek = weekDay[day];
    $('.show-date').html(nowDate);
    $('.show-week').html(nowWeek);
    //setTimeout("showTime();",1000);
  }
}
