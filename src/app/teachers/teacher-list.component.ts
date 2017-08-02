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
		type: [""]
	});
	
    errorMessage: string;

	grades = [];
	
	subjects = [];
	
	types = [];
	
	rows = [];
	
	temp = [];
	
	selected = [];
	
	columns = [
		{ prop: 'teacherName', name: '姓名' },
		{ prop: 'teacherId', name: '手机号' },
		{ prop: 'subject', name: '学科' },
		{ prop: 'classes', name: '授课班级' },
		{ prop: 'type', name: '账号类型' }
	];
	
	// filter keys:
	grade = "";
	subject = "";
	type = "";
	teacherNameId = "";

    constructor(private _teacherService: TeacherService, public fb: FormBuilder) {

    }

    ngOnInit(): void {
		this.reload();
        this.grades = this._teacherService.getGrades();
        this.subjects = this._teacherService.getSubjects();
        this.types = this._teacherService.getTypes();
	}
	
	reload() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.temp = [...data];
			this.rows = data;
		});		
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/infocen/teacher/list/0');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}	
	
	filter(event) {
		// filter our data
		var t = this;
		const temp = this.temp.filter(function(d) {
			return d.grade.indexOf(t.grade) !== -1 
			&& d.subject.indexOf(t.subject) !== -1
			&& d.type.indexOf(t.type) !== -1
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
		req.open('POST', 'http://47.92.53.57:8080/infocen/teacher/delete');
		req.setRequestHeader("Content-type", "application/json");
		var t = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				t.reload();
				alert("删除成功！");
			} else if (req.readyState == 4 && req.status != 200) {
				alert("删除失败！");
			}
		}		
		req.send(ids);
	}
}
