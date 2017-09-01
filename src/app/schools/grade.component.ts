import { Component, OnInit }  from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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
	
	gradeId: string = "";

    constructor(private _schoolService: SchoolService, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
		this.gradeId = this.route.snapshot.params.gradeId;
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
		req.open('GET', 'http://47.92.53.57:8080/info/school/grade/' + this.gradeId);
		//req.open('GET', 'assets/api/schools/grade.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}

	stringify(j){
		return JSON.stringify(j);
	}
	
}
