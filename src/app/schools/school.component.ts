import { Component, OnInit }  from '@angular/core';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'school.component.html'
})

export class SchoolComponent implements OnInit {

    errorMessage: string;

    schoolName: string = '西安一中';

	schoolId: string = "(912850)";

	types = ["初中", "完中", "九年制", "小学", "十二年制", "补习", "其他", "高中"];

	selectedType = "高中";

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
