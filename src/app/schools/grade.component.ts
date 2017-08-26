import { Component, OnInit }  from '@angular/core';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'grade.component.html'
})

export class GradeComponent implements OnInit {

    errorMessage: string;

	grade: any = {
		id: "",
		gradeOwner: {"id": "", "n": ""}
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
			this.grade = data;
		});	
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		//req.open('GET', 'http://47.92.53.57:8080/infocen/school/grade/' + this.gradeId);
		req.open('GET', 'assets/api/schools/grade.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}

	stringify(j){
		return JSON.stringify(j);
	}
	
}
