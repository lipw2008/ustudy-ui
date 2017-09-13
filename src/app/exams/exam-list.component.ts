import { Component, OnInit }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../shared.service';

@Component({
    templateUrl: 'exam-list.component.html'
})

export class ExamListComponent implements OnInit {

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
        this.grades = this._teacherService.getGrades();
        this.subjects = this._teacherService.getSubjects();
        this.roles = this._teacherService.getRoles();
	}
	
	reload() {
		//req.open('GET', 'assets/api/teachers/teachers.json');
		this._sharedService.makeRequest('GET', '/info/exam/list/0', '').then((data: any) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			for(var t of data) {
				//账号
				if (t.roles && t.roles.length >0) {
					var str = "";
					for (var r of t.roles) {
						str += r.n + " ";
					}
					t.roles = str;
				} else {
					t.roles = "";
				}
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
				//班级
				if (t.classes && t.classes.length >0) {
					var str = "";
					for (var c of t.classes) {
						str += c.n + " ";
					}
					t.classes = str;
				} else {
					t.classes = "";
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
			&& d.roles.indexOf(t.role) !== -1
			&& (d.teacherName.indexOf(t.teacherNameId) !== -1 || d.teacherId.indexOf(t.teacherNameId) !== -1);
		});
		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		//this.table.offset = 0;
	}
	
	removeTeacher(event) {
		var ids = [];
		console.log("length:" + this.selected.length);
		for(var s of this.selected) {
			var id = {"id" : ""};
			id.id = s.id;
			console.log("remove teachers:" + id.id);
			ids.push(id);
		}
		
		console.log("remove teachers:" + JSON.stringify(ids) );
		this.remove(JSON.stringify(ids));
	}
	
	remove(ids) {
		this._sharedService.makeRequest('POST', '/info/teacher/delete', ids).then((data: any) => {
			this.reload();
			alert("删除成功！");
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("删除失败！");
		});
	}
}
