import { Component, OnInit }  from '@angular/core';
 import { SharedService } from '../shared.service';


@Component({
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent{

    constructor(private _sharedService: SharedService) {
    }

    ngOnInit() {
        this.updateUserStatus();
    }

	updateUserStatus() {
		this._sharedService.makeRequest('GET', '/info/loginId', '').then((data: any) => {
			console.log("data: " + data);
			this._sharedService.userName = data.userName ===undefined ? '' : data.userName;
			this._sharedService.userRole = data.role === undefined ? '' : data.role;
			console.log("loginId success: user:" + this._sharedService.userName + " role:" + this._sharedService.userRole);
		}).catch((error: any) => {
			this._sharedService.userName = '';
			this._sharedService.userRole = '';
			console.log("loginId failed: user:" + this._sharedService.userName + " role:" + this._sharedService.userRole);
			console.log(error.status);
			console.log(error.statusText);
		});
	}
}
