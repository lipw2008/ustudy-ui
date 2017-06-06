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

    students: IStudent[];

	grades = [];
	
	classes = [];
	
	types = [];
	
	id = "";
		
    constructor(private _studentService: StudentService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {
		
    }
	
	update(event) {
		if (this.updateForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		var student = {
			"studentId" : "", 
			"studentName" : "",
			"grade" : "",
			"class" : "",
			"type" : "",
			"isTemp" : false};
		student.studentId = this.updateForm.controls.studentId.value;
		student.studentName = this.updateForm.controls.studentName.value;
		student.grade = this.updateForm.controls.gradeName.value;
		student.class = this.updateForm.controls.className.value;
		student.type = this.updateForm.controls.typeName.value;
		student.isTemp = this.updateForm.controls.isTemp.value;
		const req = new XMLHttpRequest();
		req.open('POST', "http://47.92.53.57:8080/services/info/update/student/" + this.id);
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
		req.send(JSON.stringify(student));
	}
		
    ngOnInit(): void {
		this.updateForm = this.fb.group({
			studentId: [this.route.snapshot.params.studentId, Validators.required],
			studentName: [this.route.snapshot.params.studentName, Validators.required],
			gradeName: [this.route.snapshot.params.grade, Validators.required],
			className: [this.route.snapshot.params.class, Validators.required],
			typeName: [this.route.snapshot.params.type, Validators.required],
			isTemp: [this.route.snapshot.params.isTemp === "false" ? false : true, Validators.required]
		});
		this.id = this.route.snapshot.params.id;
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
