import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ITeacher } from './teacher';
import { TeacherService } from './teacher.service';
import { SharedService } from '../shared.service';

@Component({
    templateUrl: 'add-teacher.component.html'
})

export class AddTeacherComponent implements OnInit {

	public addForm : FormGroup;
    
	errorMessage: string;

    teacher: ITeacher = {
		"teacherId" : "",
		"teacherName" : "",
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
		
    constructor(private _teacherService: TeacherService, private _sharedService: SharedService, public fb: FormBuilder, private router: Router) {

    }
	
	cancel(event) {
		this.router.navigate(['teacherList']);
	}

	add(event) {
		if (this.addForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		this.teacher.grades[0].n = this.inputGrade;
		this.teacher.subjects[0].n = this.inputSubject;
		this.teacher.roles[0].n = this.inputRole;

		this._sharedService.makeRequest('POST', '/info/teacher/add', JSON.stringify(this.teacher)).then((data: any) => {
			alert("添加成功");
			//go back to the teacher list page
			this.router.navigate(['teacherList']);
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("添加失败！");
			//go back to the teacher list page
			this.router.navigate(['teacherList']);
		});
	}
		
    ngOnInit(): void {
		this.teacher = this._teacherService.getDefaultTeacher();

		this.addForm = this.fb.group({
			teacherId: ["", Validators.required],
			teacherName: ["", Validators.required],
			grade: ["", Validators.required],
			subject: ["", Validators.required],
			role: ["", Validators.required]
		});

        this.grades = this._teacherService.getGrades();
        this.subjects = this._teacherService.getSubjects();
        this.roles = this._teacherService.getRoles();
    }
}
