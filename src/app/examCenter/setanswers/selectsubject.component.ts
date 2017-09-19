import { Component, OnInit }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'selectsubject.component.html'
})

export class SelectSubjectComponent implements OnInit {

	public searchForm = this.fb.group({
		examName: [""],
		grade: [""],
		subject: [""],
		startDate: [""],
		endDate: [""]
	});
	
    errorMessage: string;

	exams = [
		{ id: '1', name: '铜川一中16-17学年上学期期末考试' },
		{ id: '2', name: '铜川一中16-17学年上学期期末考试' },
		{ id: '3', name: '铜川一中16-17学年上学期期末考试' },
		{ id: '4', name: '铜川一中16-17学年上学期期末考试' },
		{ id: '5', name: '铜川一中16-17学年上学期期末考试' },
		{ id: '6', name: '铜川一中16-17学年上学期期末考试' }
	];

	setedsubjects = [
		{ grade: '高一', subjects: ["数学", "物理", "化学"]},
		{ grade: '高二', subjects: ["数学", "物理", "化学"]},
		{ grade: '高三', subjects: ["数学", "物理", "化学"]}
	];

	unsetedsubjects = [
		{ grade: '高一', subjects: ["语文", "英语", "生物", "政治", "地理", "历史"]},
		{ grade: '高二', subjects: ["语文", "英语", "生物", "政治", "地理", "历史"]},
		{ grade: '高三', subjects: ["语文", "英语", "生物", "政治", "地理", "历史"]}
	];

    constructor(private _sharedService: SharedService, public fb: FormBuilder) {

    }

    ngOnInit(): void {
		this.reload();
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
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}
	
	filter(event) {
		// filter our data
		// var t = this;
		// const temp = this.temp.filter(function(d) {
		// 	return d.grades.indexOf(t.grade) !== -1 
		// 	&& d.subjects.indexOf(t.subject) !== -1
		// 	&& d.examName.indexOf(t.examName) !== -1;
		// });
		// update the rows
		// this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		//this.table.offset = 0;
	}
}
