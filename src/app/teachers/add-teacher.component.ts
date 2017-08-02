import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
    templateUrl: 'add-student.component.html'
})

export class AddStudentComponent implements OnInit {

	public addForm : FormGroup;
    
	errorMessage: string;

    student: IStudent = {
		"studentId" : "",
		"studentName" : "",
		"grade" : "",
		"class" : "",
		"type" : "",
		"isTemp" : false
	};

	grades = [];
	
	classes = [];
	
	types = [];
		
    constructor(private _studentService: StudentService, public fb: FormBuilder, private router: Router) {

    }
	
	cancel(event) {
		this.router.navigate(['student']);
	}

	add(event) {
		if (this.addForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/infocen/student/add');
		req.setRequestHeader("Content-type", "application/json");
		var t = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				alert("添加成功");
				//go back to the student list page
				t.router.navigate(['student']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("添加失败！");
				//go back to the student list page
				t.router.navigate(['student']);
			}
		}
		req.send(JSON.stringify(this.student));
	}
		
    ngOnInit(): void {
		this.student = this._studentService.getDefaultStudent();

		this.addForm = this.fb.group({
			studentId: ["", Validators.required],
			studentName: ["", Validators.required],
			gradeName: ["", Validators.required],
			className: ["", Validators.required],
			typeName: ["", Validators.required],
			isTemp: [false, Validators.required]
		});

        this.grades = this._studentService.getGrades();
        this.classes = this._studentService.getClasses();
        this.types = this._studentService.getTypes();
    }
}
