import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ITeacher } from './teacher';
import { TeacherService } from './teacher.service';

@Component({
    templateUrl: 'add-teacher.component.html'
})

export class AddTeacherComponent implements OnInit {

	public addForm : FormGroup;
    
	errorMessage: string;

    teacher: ITeacher = {
		"teacherId" : "",
		"teacherName" : "",
		"grade" : "",
		"subject" : "",
		"type" : ""
	};

	grades = [];
	
	subjects = [];
	
	types = [];
		
    constructor(private _teacherService: TeacherService, public fb: FormBuilder, private router: Router) {

    }
	
	cancel(event) {
		this.router.navigate(['teacher']);
	}

	add(event) {
		if (this.addForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/infocen/teacher/add');
		req.setRequestHeader("Content-type", "application/json");
		var t = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				alert("添加成功");
				//go back to the teacher list page
				t.router.navigate(['teacher']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("添加失败！");
				//go back to the teacher list page
				t.router.navigate(['teacher']);
			}
		}
		req.send(JSON.stringify(this.teacher));
	}
		
    ngOnInit(): void {
		this.teacher = this._teacherService.getDefaultTeacher();

		this.addForm = this.fb.group({
			teacherId: ["", Validators.required],
			teacherName: ["", Validators.required],
			grade: ["", Validators.required],
			subject: ["", Validators.required],
			type: ["", Validators.required]
		});

        this.grades = this._teacherService.getGrades();
        this.subjects = this._teacherService.getSubjects();
        this.types = this._teacherService.getTypes();
    }
}
