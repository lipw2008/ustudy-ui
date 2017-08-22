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
			for(let department of this.departments){
				for(let subject of department.subjects) {
					let ownersDisplay = "";
					for(let owner of subject.owners) {
						ownersDisplay += owner.n;
						ownersDisplay += " ";
					}
					subject.ownersDisplay = ownersDisplay;
				}
			}
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

	stringify(j){
		return JSON.stringify(j);
	}
	
}
