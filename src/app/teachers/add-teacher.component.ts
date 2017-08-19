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
		"password" : "",
		"grades" : [{"n":""}],
		"subjects" : [{"n":""}],
		"roles" : [{"n":""}]
	};

	inputGrade : string;

	inputSubject : string;

	inputRole : string;

	grades = [];
	
	subjects = [];
	
	roles = [];
		
    constructor(private _teacherService: TeacherService, public fb: FormBuilder, private router: Router) {

    }
	
	cancel(event) {
		this.router.navigate(['teacherList']);
	}

	add(event) {
		if (this.addForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		this.teacher.password = this._teacherService.MD5(this.teacher.password);
		this.teacher.grades[0].n = this.inputGrade;
		this.teacher.subjects[0].n = this.inputSubject;
		this.teacher.roles[0].n = this.inputRole;

		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/info/teacher/add');
		req.setRequestHeader("Content-type", "application/json");
		var t = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status/100 == 2) {
				alert("添加成功");
				//go back to the teacher list page
				t.router.navigate(['teacherList']);
			} else if (req.readyState == 4 && req.status/100 != 2) {
				alert("添加失败！");
				//go back to the teacher list page
				t.router.navigate(['teacherList']);
			}
		}
		req.send(JSON.stringify(this.teacher));
	}
		
    ngOnInit(): void {
		this.teacher = this._teacherService.getDefaultTeacher();

		this.addForm = this.fb.group({
			teacherId: ["", Validators.required],
			teacherName: ["", Validators.required],
			password: ["", Validators.required],
			grade: ["", Validators.required],
			subject: ["", Validators.required],
			role: ["", Validators.required]
		});

        this.grades = this._teacherService.getGrades();
        this.subjects = this._teacherService.getSubjects();
        this.roles = this._teacherService.getRoles();
    }
}
