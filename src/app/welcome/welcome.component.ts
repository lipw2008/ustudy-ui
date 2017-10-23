import { Component, OnInit, AfterViewInit }  from '@angular/core';
import { SharedService } from '../shared.service';

declare var $: any;

@Component({
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent{

    constructor(public _sharedService: SharedService) {
    }

    ngOnInit() {
        this.updateUserStatus();
    }

    ngAfterViewInit() {
    }

	updateUserStatus() {
		this._sharedService.makeRequest('GET', '/api/loginId', '').then((data: any) => {
			console.log("data: " + data);
			this._sharedService.userName = data.userName ===undefined ? '' : data.userName;
			this._sharedService.userRole = data.role === undefined ? '' : data.role;
			console.log("loginId success: user:" + this._sharedService.userName + " role:" + this._sharedService.userRole);
			setTimeout(()=>{
				this.masonry();
			}, 1);
			//this.masonry();
			//alert("已登录！");
		}).catch((error: any) => {
			this._sharedService.userName = '';
			this._sharedService.userRole = '';
			console.log("loginId failed: user:" + this._sharedService.userName + " role:" + this._sharedService.userRole);
			console.log(error.status);
			console.log(error.statusText);
			//this.masonry();
			setTimeout(()=>{
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
