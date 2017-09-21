import { Component, OnInit }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'setanswers.component.html'
})

export class SetAnswersComponent implements OnInit {

	errorMessage: string;

	examId: string;
	gradeId: string;
	subjectId: string;
	seted: boolean;	

	objective = [
		{start:1,end:20,type:1,option:4,score:1},
		{start:21,end:25,type:2,option:4,score:2},
		{start:26,end:30,type:3,option:2,score:2}
	];
	objectiveAnswers = [
		{no:1,answer:'A',subject:0},
		{no:2,answer:'B',subject:0},
		{no:3,answer:'C',subject:0},
		{no:4,answer:'D',subject:0},
		{no:5,answer:'A',subject:0},
		{no:6,answer:'B',subject:0},
		{no:7,answer:'C',subject:0},
		{no:8,answer:'D',subject:0},
		{no:9,answer:'A',subject:0},
		{no:10,answer:'B',subject:10},
		{no:11,answer:'A',subject:11},
		{no:12,answer:'B',subject:12},
		{no:13,answer:'C',subject:11},
		{no:14,answer:'D',subject:10},
		{no:15,answer:'A',subject:12},
		{no:16,answer:'B',subject:0},
		{no:17,answer:'C',subject:0},
		{no:18,answer:'D',subject:0},
		{no:19,answer:'A',subject:0},
		{no:20,answer:'B',subject:0},
		{no:21,answer:'AB',subject:0},
		{no:22,answer:'BC',subject:0},
		{no:23,answer:'CD',subject:0},
		{no:24,answer:'DC',subject:0},
		{no:25,answer:'AD',subject:0},
		{no:26,answer:'0',subject:0},
		{no:27,answer:'0',subject:0},
		{no:28,answer:'1',subject:0},
		{no:29,answer:'0',subject:0},
		{no:30,answer:'1',subject:0}
	];
	subjective = [
		{type:4,start:31,end:35,subject:0,score:2},
		{type:4,start:36,subject:0,score:10},
		{type:4,start:37,subject:0,score:10,child:[
			{no:1,type:4,subject:0,score:5},
			{no:2,type:4,subject:0,score:5}
		]},
		{type:4,start:38,subject:10,score:10,child:[
			{no:1,type:4,subject:10,score:5},
			{no:2,type:4,subject:10,score:5}
		]},
		{type:4,start:39,subject:0,score:20,child:[
			{no:1,type:4,subject:10,score:6},
			{no:2,type:4,subject:11,score:6},
			{no:3,type:4,subject:12,score:8}
		]}
	];

	constructor(private _sharedService: SharedService, public fb: FormBuilder, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
		this.examId = this.route.snapshot.params.examId;
		this.gradeId = this.route.snapshot.params.gradeId;
		this.subjectId = this.route.snapshot.params.subjectId;
		this.seted = this.route.snapshot.params.seted;

		if(this.seted){
			this.reload(this.examId, this.gradeId, this.subjectId);
		}

		this.initpage();
	}

	//根據答案設置信息初始化頁面
	initpage(){

	}
	
	reload(examId,gradeId,subjectId) {
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
		// 	this.temp = [...data];
		// 	this.rows = data;
		// }).catch((error: any) => {
		// 	console.log(error.status);
		// 	console.log(error.statusText);
		// });
	}
	
	addOne(){
		
	}
}
