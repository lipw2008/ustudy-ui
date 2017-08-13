import { Component, OnInit }  from '@angular/core';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'subject.component.html'
})

export class SubjectComponent implements OnInit {

    errorMessage: string;

	rows = [];
	
	columns = [
		{ prop: 'grade', name: '年级' },
		{ prop: 'classNum', name: '班级数' },
		{ prop: 'artClasses', name: '文科班' },
		{ prop: 'sciClasses', name: '理科班' },
		{ prop: 'studentNum', name: '学生数' }
	];
	
    constructor(private _schoolService: SchoolService) {

    }

    ngOnInit(): void {
		this.reload();
	}
	
	reload() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.rows = data;
		});		
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		//req.open('GET', 'http://47.92.53.57:8080/infocen/student/list/0');
		req.open('GET', 'assets/api/schools/school.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}
	
}
