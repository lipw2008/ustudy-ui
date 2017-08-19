import { Component, OnInit }  from '@angular/core';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'subject.component.html'
})

export class SubjectComponent implements OnInit {

    errorMessage: string;

	departments = [];
	
    constructor(private _schoolService: SchoolService) {

    }

    ngOnInit(): void {
		this.reload();
	}
	
	reload() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.departments = data;
		});	
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		//req.open('GET', 'http://47.92.53.57:8080/infocen/school/subject/list/' + this._schoolService.getSchoolId());
		req.open('GET', 'assets/api/schools/departments.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}
	
}
