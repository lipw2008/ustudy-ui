import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Component({
    selector: 'ustudy-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    pageTitle: string = '蘑菇云后台管理系统';
    userName: string = '';
	
	role: string = "校长";
	
	constructor(private _sharedService: SharedService, private router: Router) {

	}

    ngOnInit() : void {
  		this.getUser();
    }

	checkLogInStatus() : void {
		//alert("clicked");
	}

	logout(): void {
		this._sharedService.makeRequest('GET', '/info/logout', '').then((data: any) => {
			alert("您已退出");
			this.userName = '';
			this.router.navigate(['welcome']);
		}).catch((error: any) => {
			alert("退出失败");
			this.router.navigate(['welcome']);
		});
	}

	getUser() {
		this._sharedService.makeRequest('GET', '/info/loginId', '').then((data: any) => {
			console.log("data: " + data);
			this.userName = data.userName ===undefined ? '' : data.userName;
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}	
}
