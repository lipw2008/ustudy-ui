import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
    templateUrl: 'update-student.component.html'
})

export class UpdateStudentComponent implements OnInit {

	public updateForm : FormGroup;
	
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
	
    constructor(private _studentService: StudentService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {
		
    }
	
	cancel(event) {
		this.router.navigate(['student']);
	}

	update(event) {
		if (this.updateForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		const req = new XMLHttpRequest();
		req.open('POST', "http://47.92.53.57:8080/infocen/student/update");
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				alert("修改成功");
				//go back to the student list page
				that.router.navigate(['student']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("修改失败！");
				//go back to the student list page
				that.router.navigate(['student']);
			}
		}
		req.send(JSON.stringify(this.student));
	}
		
    ngOnInit(): void {
		this.updateForm = this.fb.group({
			studentId: ["", Validators.required],
			studentName: ["", Validators.required],
			gradeName: ["", Validators.required],
			className: ["", Validators.required],
			typeName: ["", Validators.required],
			isTemp: [false]
		});
		this.student.studentId = this.route.snapshot.params.studentId;
		this.student.studentName = this.route.snapshot.params.studentName;
		this.student.grade = this.route.snapshot.params.grade;
		this.student.class = this.route.snapshot.params.class;
		this.student.type = this.route.snapshot.params.type;
		this.student.isTemp = this.route.snapshot.params.isTemp === "false" ? false : true;
		this.student.id = this.route.snapshot.params.id;
        this.grades = this._studentService.getGrades();
        this.classes = this._studentService.getClasses();
        this.types = this._studentService.getTypes();
//		$('#addStudentInfoForm').bootstrapValidator();
//		var $form = $('#addStudentInfoForm');
//        $form.bootstrapValidator();
//		$(':reset').click(function() {
//            $form.data('bootstrapValidator').resetForm(true);
//        });
    }
}
