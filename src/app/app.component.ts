import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ustudy-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    pageTitle: string = '蘑菇云后台管理系统';
    userName: string = '';

    ngOnInit() : void {
        console.log("get user name...");
		this.getUserName();
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
