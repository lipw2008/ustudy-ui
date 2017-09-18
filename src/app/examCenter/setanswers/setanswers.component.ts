import { Component, OnInit }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'setanswers.component.html'
})

export class SetAnswersComponent implements OnInit {

	public searchForm = this.fb.group({
		examName: [""],
		grade: [""],
		subject: [""],
		startDate: [""],
		endDate: [""]
	});
	
    errorMessage: string;

	grades = [];
	
	subjects = [];
	
	rows = [];
	
	temp = [];
	
	columns = [
		{ prop: 'examName', name: '考试名称' },
		{ prop: 'startDate', name: '开考时间' },
		{ prop: 'grades', name: '考试年级' },
		{ prop: 'subjects', name: '考试科目' },
		{ prop: 'examineeNum', name: '考生人数' }
	];
	
	// filter keys:
	grade = "";
	subject = "";
	startDate = "";
	endDate = "";
	examName = "";

    constructor(private _sharedService: SharedService, public fb: FormBuilder) {

    }

    ngOnInit(): void {
		this.reload();
        this.grades = ["高一", "高二", "高三"];
        this.subjects = ["数学", "物理", "化学"];
	}
	
	reload() {
		//req.open('GET', 'assets/api/teachers/teachers.json');
		this._sharedService.makeRequest('GET', 'assets/api/exams/exams.json', '').then((data: any) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			for(var t of data) {
				//科目
				if (t.subjects && t.subjects.length >0) {
					var str = "";
					for (var s of t.subjects) {
						str += s.n + " ";
					}
					t.subjects = str;
				} else {
					t.subjects = "";
				}	
				//年级
				if (t.grades && t.grades.length >0) {
					var str = "";
					for (var g of t.grades) {
						str += g.n + " ";
					}
					t.grades = str;
				} else {
					t.grades = "";
				}							
			}
			this.temp = [...data];
			this.rows = data;
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}
	
	filter(event) {
		// filter our data
		var t = this;
		const temp = this.temp.filter(function(d) {
			return d.grades.indexOf(t.grade) !== -1 
			&& d.subjects.indexOf(t.subject) !== -1
			&& d.examName.indexOf(t.examName) !== -1;
		});
		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		//this.table.offset = 0;
	}
}
