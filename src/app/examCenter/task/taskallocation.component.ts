import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'taskallocation.component.html'
})

export class TaskAllocationComponent implements OnInit {

	errorMessage: string;

	examId: string;
	gradeId: string;
	subjectId: string;
	seted: boolean;
	index = 0;
	currentSubjectiveId = 0;
	
	groups = [
		{id:1,name:'语文组'},
		{id:2,name:'数学组'},
		{id:3,name:'英语组'},
		{id:4,name:'物理组'},
		{id:5,name:'化学组'},
		{id:6,name:'生物组'},
		{id:7,name:'政治组'},
		{id:8,name:'历史组'},
		{id:9,name:'地理组'},
		{id:0,name:'全体教师'}
	];

	teachers = [
		{id:11, name:'黄药师', group: 1, distributed:false},
		{id:12, name:'欧阳锋', group: 1, distributed:false},
		{id:13, name:'一灯', group: 1, distributed:false},
		{id:14, name:'洪七公', group: 1, distributed:false},
		{id:15, name:'王重阳', group: 1, distributed:false},
		{id:21, name:'黄药师', group: 2, distributed:false},
		{id:22, name:'欧阳锋', group: 2, distributed:false},
		{id:23, name:'一灯', group: 2, distributed:false},
		{id:24, name:'洪七公', group: 2, distributed:false},
		{id:25, name:'王重阳', group: 2, distributed:false},
		{id:31, name:'黄药师', group: 3, distributed:false},
		{id:32, name:'欧阳锋', group: 3, distributed:false},
		{id:33, name:'一灯', group: 3, distributed:false},
		{id:34, name:'洪七公', group: 3, distributed:false},
		{id:35, name:'王重阳', group: 3, distributed:false},
		{id:41, name:'黄药师', group: 4, distributed:false},
		{id:42, name:'欧阳锋', group: 4, distributed:false},
		{id:43, name:'一灯', group: 4, distributed:false},
		{id:44, name:'洪七公', group: 4, distributed:false},
		{id:45, name:'王重阳', group: 4, distributed:false},
		{id:51, name:'黄药师', group: 5, distributed:false},
		{id:52, name:'欧阳锋', group: 5, distributed:false},
		{id:53, name:'一灯', group: 5, distributed:false},
		{id:54, name:'洪七公', group: 5, distributed:false},
		{id:55, name:'王重阳', group: 5, distributed:false},
		{id:61, name:'黄药师', group: 6, distributed:false},
		{id:62, name:'欧阳锋', group: 6, distributed:false},
		{id:63, name:'一灯', group: 6, distributed:false},
		{id:64, name:'洪七公', group: 6, distributed:false},
		{id:65, name:'王重阳', group: 6, distributed:false},
		{id:71, name:'黄药师', group: 7, distributed:false},
		{id:72, name:'欧阳锋', group: 7, distributed:false},
		{id:73, name:'一灯', group: 7, distributed:false},
		{id:74, name:'洪七公', group: 7, distributed:false},
		{id:75, name:'王重阳', group: 7, distributed:false},
		{id:81, name:'黄药师', group: 8, distributed:false},
		{id:82, name:'欧阳锋', group: 8, distributed:false},
		{id:83, name:'一灯', group: 8, distributed:false},
		{id:84, name:'洪七公', group: 8, distributed:false},
		{id:85, name:'王重阳', group: 8, distributed:false},
		{id:91, name:'黄药师', group: 9, distributed:false},
		{id:92, name:'欧阳锋', group: 9, distributed:false},
		{id:93, name:'一灯', group: 9, distributed:false},
		{id:94, name:'洪七公', group: 9, distributed:false},
		{id:95, name:'王重阳', group: 9, distributed:false},
		{id:101, name:'黄药师', group: 10, distributed:false},
		{id:102, name:'欧阳锋', group: 10, distributed:false},
		{id:103, name:'一灯', group: 10, distributed:false},
		{id:104, name:'洪七公', group: 10, distributed:false},
		{id:105, name:'王重阳', group: 10, distributed:false}
	];

	subjectives = [
		{id:1, type:4, start:1, end:10, dmode:1, mmode:1, time:5, score:1, pre: {group:10, all:true, teachers:[]}, final: {group:10, all:true, teachers:[]}},
		{id:2, type:5, start:11, dmode:1, mmode:2, time:5, score:1, pre: {group:10, all:true, teachers:[]}, final: {group:10, all:true, teachers:[]}},
		{id:3, type:6, start:12, dmode:1, mmode:2, time:6, score:2, pre: {group:9, all:true, teachers:[]}, final: {group:9, all:true, teachers:[]}},
		{id:4, type:7, start:13, dmode:1, mmode:2, time:7, score:3, pre: {group:8, all:true, teachers:[]}, final: {group:8, all:true, teachers:[]}}
	];

	onSubjectiveValueChange(valueType, id) {
		this.subjectives.forEach(subjective => {
			if (subjective.id === id) {
				
			}
		});
	}

	constructor(private _sharedService: SharedService, public fb: FormBuilder, private elementRef: ElementRef, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
		this.examId = this.route.snapshot.params.examId;
		this.gradeId = this.route.snapshot.params.gradeId;
		this.subjectId = this.route.snapshot.params.subjectId;
		this.seted = this.route.snapshot.params.seted;

		if(this.seted){
			this.reload(this.examId, this.gradeId, this.subjectId);
		}

		if (this.subjectives.length > 0) {
			this.currentSubjectiveId = this.subjectives[0].id;
		}
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

	saveOne() {
		//保存 
		let subjective;
		this.subjectives.forEach(element => {
			if (element.id === this.currentSubjectiveId) {
				subjective = element;
			}
		});

		if (this.index + 1 < this.subjectives.length) {
			this.index = this.index + 1;
			this.currentSubjectiveId = this.subjectives[this.index].id;
		}
	}
}
