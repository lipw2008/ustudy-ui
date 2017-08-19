import { Component, OnInit }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ITeacher } from './teacher';
import { TeacherService } from './teacher.service';

@Component({
    templateUrl: 'teacher-list.component.html'
})

export class TeacherListComponent implements OnInit {

	public searchForm = this.fb.group({
		teacherNameId: [""],
		grade: [""],
		subject: [""],
		role: [""]
	});
	
    errorMessage: string;

	grades = [];
	
	subjects = [];
	
	roles = [];
	
	rows = [];
	
	temp = [];
	
	selected = [];
	
	columns = [
		{ prop: 'teacherName', name: '姓名' },
		{ prop: 'teacherId', name: '手机号' },
		{ prop: 'subjects', name: '学科' },
		{ prop: 'classes', name: '授课班级' },
		{ prop: 'roles', name: '账号类型' }
	];
	
	// filter keys:
	grade = "";
	subject = "";
	role = "";
	teacherNameId = "";

    constructor(private _teacherService: TeacherService, public fb: FormBuilder) {

    }

    ngOnInit(): void {
		this.reload();
        this.grades = this._teacherService.getGrades();
        this.subjects = this._teacherService.getSubjects();
        this.roles = this._teacherService.getRoles();
	}
	
	reload() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			for(var t of data) {
				//账号
				if (t.roles.length >0) {
					var str = "";
					for (var r of t.roles) {
						str += r.n + " ";
					}
					t.roles = str;
				} else {
					t.roles = "";
				}
				//科目
				if (t.subjects.length >0) {
					var str = "";
					for (var s of t.subjects) {
						str += s.n + " ";
					}
					t.subjects = str;
				} else {
					t.subjects = "";
				}	
				//年级
				if (t.grades.length >0) {
					var str = "";
					for (var g of t.grades) {
						str += g.n + " ";
					}
					t.grades = str;
				} else {
					t.grades = "";
				}							
				//班级
				if (t.classes.length >0) {
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
		});		
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/info/teacher/list/0');
		//req.open('GET', 'assets/api/teachers/teachers.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
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
		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/info/teacher/delete');
		req.setRequestHeader("Content-type", "application/json");
		var t = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status/100 == 2) {
				t.reload();
				alert("删除成功！");
			} else if (req.readyState == 4 && req.status/100 != 2) {
				alert("删除失败！");
			}
		}		
		req.send(ids);
	}
}
