import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ITeacher } from './teacher';
import { TeacherService } from './teacher.service';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'update-teacher.component.html'
})

export class UpdateTeacherComponent implements OnInit {

	public updateForm : FormGroup;
	
    errorMessage: string;

    teacher: ITeacher = {
    	"id" : "",
		"teacherId" : "",
		"teacherName" : ""
	};
	
    constructor(private _teacherService: TeacherService, private _sharedService: SharedService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {
		
    }
	
	cancel(event) {
		this.router.navigate(['teacherList']);
	}

	update(event) {
		if (this.updateForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		this._sharedService.makeRequest('POST', '/info/teacher/update', JSON.stringify(this.teacher)).then((data: any) => {
			alert("修改成功");
			//go back to the teacher list page
			this.router.navigate(['teacherList']);
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("修改失败！");
			//go back to the teacher list page
			this.router.navigate(['teacherList']);
		});
	}
		
    ngOnInit(): void {
		this.updateForm = this.fb.group({
			teacherId: ["", Validators.required],
			teacherName: ["", Validators.required]
		});
		this.teacher.teacherId = this.route.snapshot.params.teacherId;
		this.teacher.teacherName = this.route.snapshot.params.teacherName;
		this.teacher.id = this.route.snapshot.params.id;
    }
}
