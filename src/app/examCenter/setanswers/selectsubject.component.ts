import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'selectsubject.component.html'
})

export class SelectSubjectComponent implements OnInit {

	errorMessage: string;
	examId: string;
	type = 'answers';

	exams = [
		{ id: '1', name: '铜川一中16-17学年上学期期末考试1' },
		{ id: '2', name: '铜川一中16-17学年上学期期末考试2' },
		{ id: '3', name: '铜川一中16-17学年上学期期末考试3' },
		{ id: '4', name: '铜川一中16-17学年上学期期末考试4' },
		{ id: '5', name: '铜川一中16-17学年上学期期末考试5' },
		{ id: '6', name: '铜川一中16-17学年上学期期末考试6' }
	];

	gradesubjects = [
		{ id:'10', grade: '高一', subjects: [
			{id: '1', name: '语文', seted:true},
			{id: '2', name: '数学', seted:false},
			{id: '3', name: '英语', seted:true},
			{id: '4', name: '物理', seted:false},
			{id: '5', name: '化学', seted:true},
			{id: '6', name: '生物', seted:false},
			{id: '7', name: '政治', seted:true},
			{id: '8', name: '历史', seted:false},
			{id: '9', name: '地理', seted:true}
		]},
		{ id:'11', grade: '高二', subjects: [
			{id: '1', name: '语文', seted:true},
			{id: '2', name: '数学', seted:false},
			{id: '3', name: '英语', seted:true},
			{id: '4', name: '物理', seted:false},
			{id: '5', name: '化学', seted:false},
			{id: '6', name: '生物', seted:false},
			{id: '7', name: '政治', seted:true},
			{id: '8', name: '历史', seted:false},
			{id: '9', name: '地理', seted:true},
			{id: '10', name: '文综', seted:false},
			{id: '11', name: '理综', seted:true}
		]},
		{ id:'12', grade: '高三', subjects: [
			{id: '1', name: '语文', seted:true},
			{id: '2', name: '数学', seted:false},
			{id: '3', name: '英语', seted:true},
			{id: '4', name: '物理', seted:false},
			{id: '5', name: '化学', seted:true},
			{id: '6', name: '生物', seted:false},
			{id: '7', name: '政治', seted:false},
			{id: '8', name: '历史', seted:false},
			{id: '9', name: '地理', seted:false},
			{id: '10', name: '文综', seted:true},
			{id: '11', name: '理综', seted:false}
		]}
	];

    constructor(private _sharedService: SharedService, public fb: FormBuilder, private elementRef: ElementRef, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
		this.type = this.route.snapshot.params.type;
		this.loadExams();
	}

	loadExams() {

	}
	
	reload(examId) {
		// //req.open('GET', 'assets/api/teachers/teachers.json');
		// this._sharedService.makeRequest('GET', 'assets/api/exams/exams.json', '').then((data: any) => {
		// 	//cache the list
		// 	console.log("data: " + JSON.stringify(data));
		// 	for(var t of data) {
		// 		//科目
		// 		if (t.subjects && t.subjects.length >0) {
		// 			var str = "";
		// 			for (var s of t.subjects) {
		// 				str += s.n + " ";
		// 			}
		// 			t.subjects = str;
		// 		} else {
		// 			t.subjects = "";
		// 		}	
		// 		//年级
		// 		if (t.grades && t.grades.length >0) {
		// 			var str = "";
		// 			for (var g of t.grades) {
		// 				str += g.n + " ";
		// 			}
		// 			t.grades = str;
		// 		} else {
		// 			t.grades = "";
		// 		}							
		// 	}
		// }).catch((error: any) => {
		// 	console.log(error.status);
		// 	console.log(error.statusText);
		// });
	}

	getExam() {
		const examId = this.elementRef.nativeElement.querySelector('#examFilterValue').value;
		this.examId = examId;
		if(examId !== "0"){
			this.reload(examId);
			this.elementRef.nativeElement.querySelector('#editGradeDetailsForm').style.display = '';
		}else{
			this.elementRef.nativeElement.querySelector('#editGradeDetailsForm').style.display = 'none';
		}
	}	

	setAnswers(gradeId,subjectId,seted) {
		this.router.navigate(['setanswers', {examId: this.examId, gradeId: gradeId, subjectId: subjectId, seted: seted}]);
	}

	setTasks(gradeId,subjectId,seted) {
		this.router.navigate(['taskallocation', {examId: this.examId, gradeId: gradeId, subjectId: subjectId, seted: seted}]);
	}
}