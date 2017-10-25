import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';


@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  public loginForm: FormGroup;

  role = '任课老师';

  username: '';
  password: '';
  reqContent = {
    'data': '',
    'reqContentType': 'application/x-www-form-urlencoded',
    'resContentType': 'application/json'
  }

  constructor(private _sharedService: SharedService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    //this.getUser();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(event) {
    if (this.loginForm.status == 'INVALID') {
      alert('信息不完整');
      return;
    }

    this.reqContent.data = 'username=' + this.username + '&password=' + this._sharedService.MD5(this.password);

    console.log('reqContent:' + this.reqContent.data);

    this._sharedService.makeRequest('POST', '/api/login', this.reqContent).then((data: any) => {
      alert('登录成功');
      this._sharedService.userName = data.userName === undefined ? '' : data.userName;
      this._sharedService.userRole = data.role === undefined ? '' : data.role;
      console.log('login successful: user:' + this._sharedService.userName + ' role:' + this._sharedService.userRole);
      this.router.navigate(['welcome']);
    }).catch((error: any) => {
      this._sharedService.userName = '';
      this._sharedService.userRole = '';
      console.log(error.status);
      console.log(error.statusText);
      alert('登录失败！');
      this.router.navigate(['welcome']);
    });
  }
}
