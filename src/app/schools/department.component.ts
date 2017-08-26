import { Component, OnInit }  from '@angular/core';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'department.component.html'
})

export class DepartmentComponent implements OnInit {

    errorMessage: string;

    school: any = {
		"departments": []
	};
	
    constructor(private _schoolService: SchoolService) {

    }

    ngOnInit(): void {
		this.reload();
	}
	
	reload() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.school = data;
		});	
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		//req.open('GET', 'http://47.92.53.57:8080/infocen/school/subject/list/' + this._schoolService.getSchoolId());
		req.open('GET', 'assets/api/schools/school.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}

	stringify(j){
		return JSON.stringify(j);
	}
	
}
