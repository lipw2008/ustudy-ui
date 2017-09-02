import { Component, OnInit }  from '@angular/core';


@Component({
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent{

    role: string = "任课老师";

    ngOnInit() {
        this.getUserName();
    }

    getUserName() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + data);
			//this.userName = data===undefined ? '' : data;
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
