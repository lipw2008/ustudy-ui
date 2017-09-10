import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IStudent } from './student';
import { StudentService } from './student.service';
import { SharedService } from '../shared.service';

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
	
    constructor(private _studentService: StudentService, private _sharedService: SharedService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {
		
    }
	
	cancel(event) {
		this.router.navigate(['studentList']);
	}

	update(event) {
		if (this.updateForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		this._sharedService.makeRequest('POST', '/info/student/update', JSON.stringify(this.student)).then((data: any) => {
			alert("修改成功");
			//go back to the teacher list page
			this.router.navigate(['studentList']);
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("修改失败！");
			//go back to the teacher list page
			this.router.navigate(['studentList']);
		});
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
