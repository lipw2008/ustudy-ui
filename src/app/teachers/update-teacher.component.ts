import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ITeacher } from './teacher';
import { TeacherService } from './teacher.service';

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
	
    constructor(private _teacherService: TeacherService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {
		
    }
	
	cancel(event) {
		this.router.navigate(['teacherList']);
	}

	update(event) {
		if (this.updateForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		const req = new XMLHttpRequest();
		req.open('POST', "http://47.92.53.57:8080/info/teacher/update");
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status/100 == 2) {
				alert("修改成功");
				//go back to the teacher list page
				that.router.navigate(['teacherList']);
			} else if (req.readyState == 4 && req.status/100 != 2) {
				alert("修改失败！");
				//go back to the teacher list page
				that.router.navigate(['teacherList']);
			}
		}
		req.send(JSON.stringify(this.teacher));
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
