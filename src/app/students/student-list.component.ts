import { Component, OnInit }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
    templateUrl: 'student-list.component.html'
})

export class StudentListComponent implements OnInit {

	public searchForm = this.fb.group({
		studentName: [""],
		gradeName: [""],
		className: [""],
		type: [""]
	});
	
    errorMessage: string;

    students: IStudent[];

	grades = [];
	
	classes = [];
	
	types = [];
	
	rows = [];
	
	temp = [];
	
	selected = [];
	
	columns = [
		{ prop: 'studentName', name: '姓名' },
		{ prop: 'grade', name: '年级' },
		{ prop: 'class', name: '班级' }
	];
	
	// filter keys:
	grade = "";
	class = "";
	studentType = "";
	studentName = "";

    constructor(private _studentService: StudentService, public fb: FormBuilder) {

    }

    ngOnInit(): void {
		this.reload();
        this.grades = this._studentService.getGrades();
        this.classes = this._studentService.getClasses();
        this.types = this._studentService.getTypes();
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
		req.open('GET', 'http://47.92.53.57:8080/info/student/list/0');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}	
	
	filter(event) {
		// const gradeName = this.elm.nativeElement.querySelector('#gradeFilterValue').value;
		// const className = this.elm.nativeElement.querySelector('#classFilterValue').value;
		// const type = this.elm.nativeElement.querySelector('#typeFilterValue').value;
		// const studentName = this.elm.nativeElement.querySelector('#studentNameFilterValue').value;		
			
		// filter our data
		var t = this;
		const temp = this.temp.filter(function(d) {
			return d.grade.indexOf(t.grade) !== -1 
			&& d.class.indexOf(t.class) !== -1
			&& d.type.indexOf(t.studentType) !== -1
			&& d.studentName.indexOf(t.studentName) !== -1;
		});
		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		//this.table.offset = 0;
	}
	
	removeStudent(event) {
		var ids = [];
		console.log("length:" + this.selected.length);
		for(var s of this.selected) {
			var id = {"id" : ""};
			id.id = s.id;
			console.log("remove students:" + id.id);
			ids.push(id);
		}
		
		console.log("remove students:" + JSON.stringify(ids) );
		this.remove(JSON.stringify(ids));
	}
	
	remove(ids) {
		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/info/student/delete');
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
	
	updateStudent(id) {
		console.log("update student: " + id);
	}
}
