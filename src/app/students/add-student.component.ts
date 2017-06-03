import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
    templateUrl: 'app/students/add-student.component.html'
})

export class AddStudentComponent implements OnInit {

	public addForm : FormGroup;
    
	errorMessage: string;

    students: IStudent[];

	grades = [];
	
	classes = [];
	
	types = [];
		
    constructor(private _studentService: StudentService, public fb: FormBuilder, private router: Router) {

    }
	
	add(event) {
		if (this.addForm.status == "INVALID") {
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
		student.studentId = this.addForm.controls.studentId.value;
		student.studentName = this.addForm.controls.studentName.value;
		student.grade = this.addForm.controls.gradeName.value;
		student.class = this.addForm.controls.className.value;
		student.type = this.addForm.controls.typeName.value;
		student.isTemp = this.addForm.controls.isTemp.value;
		
		const req = new XMLHttpRequest();
		req.open('POST', 'http://localhost:8080/services/info/add/student');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 201) {
				alert("添加成功");
				//go back to the student list page
				that.router.navigate(['student']);
			} else if (req.readyState == 4 && req.status != 201) {
				alert("添加失败！");
			}
		}
		req.send(JSON.stringify(student));
	}
		
    ngOnInit(): void {
		this.addForm = this.fb.group({
			studentId: ["", Validators.required],
			studentName: ["", Validators.required],
			gradeName: ["", Validators.required],
			className: ["", Validators.required],
			typeName: ["普通", Validators.required],
			isTemp: [false, Validators.required]
		});

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
