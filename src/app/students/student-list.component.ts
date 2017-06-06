import { Component, OnInit, ElementRef }  from '@angular/core';
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
	
    constructor(private _studentService: StudentService, private elm: ElementRef, public fb: FormBuilder) {
		this.elm = elm;
    }

	search(event) {
		console.log(event);
		console.log(this.searchForm.value);
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
			console.log("data: " + JSON.stringify(data.students));
			this.temp = [...data.students];
			this.rows = data.students;
		});		
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/services/info/list/student/0');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}	
	
	updateFilter(event) {
		const gradeName = this.elm.nativeElement.querySelector('#gradeFilterValue').value;
		const className = this.elm.nativeElement.querySelector('#classFilterValue').value;
		const type = this.elm.nativeElement.querySelector('#typeFilterValue').value;
		const studentName = this.elm.nativeElement.querySelector('#studentNameFilterValue').value;		
			
		// filter our data
		const temp = this.temp.filter(function(d) {
			return d.grade.indexOf(gradeName) !== -1 
			&& d.class.indexOf(className) !== -1
			&& d.type.indexOf(type) !== -1
			&& d.studentName.indexOf(studentName) !== -1;
		});
		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		//this.table.offset = 0;
	}
	
	removeStudent(event) {
		var ids = [];
		console.log("length:" + this.selected.length);
		for(var i=0; i<this.selected.length; i++) {
			var j = {"id" : ""};
			j.id = this.selected[i].id;
			console.log("remove students:" + j.id);
			ids.push(j);
		}
		
		console.log("remove students:" + JSON.stringify(ids) );
		this.remove(JSON.stringify(ids));
	}
	
	remove(ids) {
		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/services/info/delete/student');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				that.reload();
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
