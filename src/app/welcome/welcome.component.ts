import { Component, OnInit }  from '@angular/core';
 import { SharedService } from '../shared.service';


@Component({
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent{

    role: string = "任课老师";

    constructor(private _sharedService: SharedService) {
    }

    ngOnInit() {
        this.getUser();
    }

	getUser() {
		this._sharedService.makeRequest('GET', '/info/loginId', '').then((data: any) => {
			console.log("data: " + data);
			this.role = data.role ===undefined ? '' : data.role;
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}
}
