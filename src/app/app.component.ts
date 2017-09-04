import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ustudy-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    pageTitle: string = '蘑菇云后台管理系统';
    userName: string = '';
	
	role: string = "校长";
	
	constructor(private router: Router) {

	}

    ngOnInit() : void {
        console.log("get user name...");
		this.getUserName();
    }

	checkLogInStatus() : void {
		//alert("clicked");
	}

	logout(): void {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/info/logout');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status/100 == 2) {
				alert("您已退出");
				that.userName = '';
				that.router.navigate(['welcome']);
			} else if (req.readyState == 4 && req.status/100 != 2) {
				alert("退出失败！");
				that.router.navigate(['welcome']);
			}
		}
		req.send();
	}

    getUserName() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + data);
			this.userName = data===undefined ? '' : data;
		});		
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/info/loginId');
		req.onload = () => {
			cb(req.response);
		};
		
		req.send();
	}	
}
