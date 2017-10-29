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
		{id:10,name:'全体教师'}
	];

	teachers = [
		{id:11, name:'黄药师1', group: 1, distributed:false},
		{id:12, name:'欧阳锋1', group: 1, distributed:true},
		{id:13, name:'一灯1', group: 1, distributed:false},
		{id:14, name:'洪七公1', group: 1, distributed:false},
		{id:15, name:'王重阳1', group: 1, distributed:false},
		{id:21, name:'黄药师2', group: 2, distributed:false},
		{id:22, name:'欧阳锋2', group: 2, distributed:false},
		{id:23, name:'一灯2', group: 2, distributed:false},
		{id:24, name:'洪七公2', group: 2, distributed:true},
		{id:25, name:'王重阳2', group: 2, distributed:false},
		{id:31, name:'黄药师3', group: 3, distributed:false},
		{id:32, name:'欧阳锋3', group: 3, distributed:false},
		{id:33, name:'一灯3', group: 3, distributed:false},
		{id:34, name:'洪七公3', group: 3, distributed:false},
		{id:35, name:'王重阳3', group: 3, distributed:false},
		{id:41, name:'黄药师4', group: 4, distributed:false},
		{id:42, name:'欧阳锋4', group: 4, distributed:true},
		{id:43, name:'一灯4', group: 4, distributed:false},
		{id:44, name:'洪七公4', group: 4, distributed:false},
		{id:45, name:'王重阳4', group: 4, distributed:false},
		{id:51, name:'黄药师5', group: 5, distributed:false},
		{id:52, name:'欧阳锋5', group: 5, distributed:false},
		{id:53, name:'一灯5', group: 5, distributed:false},
		{id:54, name:'洪七公5', group: 5, distributed:true},
		{id:55, name:'王重阳5', group: 5, distributed:false},
		{id:61, name:'黄药师6', group: 6, distributed:false},
		{id:62, name:'欧阳锋6', group: 6, distributed:false},
		{id:63, name:'一灯6', group: 6, distributed:false},
		{id:64, name:'洪七公6', group: 6, distributed:false},
		{id:65, name:'王重阳6', group: 6, distributed:false},
		{id:71, name:'黄药师7', group: 7, distributed:false},
		{id:72, name:'欧阳锋7', group: 7, distributed:true},
		{id:73, name:'一灯7', group: 7, distributed:false},
		{id:74, name:'洪七公7', group: 7, distributed:true},
		{id:75, name:'王重阳7', group: 7, distributed:false},
		{id:81, name:'黄药师8', group: 8, distributed:false},
		{id:82, name:'欧阳锋8', group: 8, distributed:false},
		{id:83, name:'一灯8', group: 8, distributed:false},
		{id:84, name:'洪七公8', group: 8, distributed:true},
		{id:85, name:'王重阳8', group: 8, distributed:false},
		{id:91, name:'黄药师9', group: 9, distributed:true},
		{id:92, name:'欧阳锋9', group: 9, distributed:false},
		{id:93, name:'一灯9', group: 9, distributed:false},
		{id:94, name:'洪七公9', group: 9, distributed:false},
		{id:95, name:'王重阳9', group: 9, distributed:true},
		{id:101, name:'黄药师0', group: 10, distributed:false},
		{id:102, name:'欧阳锋0', group: 10, distributed:false},
		{id:103, name:'一灯0', group: 10, distributed:false},
		{id:104, name:'洪七公0', group: 10, distributed:false},
		{id:105, name:'王重阳0', group: 10, distributed:false}
	];

	subjectives = [
		{id:1, type:4, start:1, end:10, dmode:1, mmode:1, time:5, score:1, pre: {group:10, all:1, teachers:[]}, final: {group:10, all:1, teachers:[]}},
		{id:2, type:5, start:11, dmode:1, mmode:2, time:5, score:1, pre: {group:10, all:1, teachers:[]}, final: {group:10, all:0, teachers:[]}},
		{id:3, type:6, start:12, dmode:2, mmode:1, time:6, score:2, pre: {group:9, all:0, teachers:[]}, final: {group:9, all:1, teachers:[]}},
		{id:4, type:7, start:13, dmode:3, mmode:2, time:7, score:3, pre: {group:8, all:0, teachers:[]}, final: {group:8, all:0, teachers:[]}}
	];

	onSubjectiveValueChange(valueType, id, value) {
		//debugger;
		this.subjectives.forEach(subjective => {
			if (subjective.id === id) {
				if (valueType === 'number') {
					let number = parseInt(this.elementRef.nativeElement.querySelector('#subjective_number_' + id).value);
					this.currentSubjectiveId = number;
					for (var i=0;i<this.subjectives.length;i++) {
						if (this.subjectives[i].id === number){
							this.index = i;
						}
					}
				} else if (valueType === 'type') {
					let type = parseInt(this.elementRef.nativeElement.querySelector('#subjective_type_' + id).value);
					subjective.type = type;
				} else if (valueType === 'dmode') {
					subjective.dmode = value;
				} else if (valueType === 'mmode') {
					subjective.mmode = value;
				} else if (valueType === 'time') {
					let time = parseInt(this.elementRef.nativeElement.querySelector('#subjective_time_' + id).value);
					subjective.time = time;
				} else if (valueType === 'score') {
					let score = parseInt(this.elementRef.nativeElement.querySelector('#subjective_score_' + id).value);
					subjective.score = score;
				} else if (valueType === 'pre_groups') {
					let pre_groups = parseInt(this.elementRef.nativeElement.querySelector('#subjective_pre_groups_' + id).value);
					subjective.pre.group = pre_groups;
				} else if (valueType === 'pre_all') {
					let pre_all = parseInt(this.elementRef.nativeElement.querySelector('#subjective_pre_all_' + id).value);
					subjective.pre.all = pre_all;
				} else if (valueType === 'final_groups') {
					let final_groups = parseInt(this.elementRef.nativeElement.querySelector('#subjective_final_groups_' + id).value);
					subjective.final.group = final_groups;
				} else if (valueType === 'final_all') {
					let final_all = parseInt(this.elementRef.nativeElement.querySelector('#subjective_final_all_' + id).value);
					subjective.final.all = final_all;
				}
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

		let subjective_pre_teachers = document.getElementsByName('subjective_pre_teachers');
		for ( var i = 0; i < subjective_pre_teachers.length; i++) {
			if (subjective_pre_teachers[i]['checked']) {
				subjective.pre.teachers.push(subjective_pre_teachers[i]['value']);
			}
		}
		if(subjective.mmode === 2){
			let subjective_final_teachers = document.getElementsByName('subjective_final_teachers');
			for ( var i = 0; i < subjective_final_teachers.length; i++) {
				if (subjective_final_teachers[i]['checked']) {
					subjective.final.teachers.push(subjective_final_teachers[i]['value']);
				}
			}
		}

		if (this.index + 1 < this.subjectives.length) {
			this.index = this.index + 1;
			this.currentSubjectiveId = this.subjectives[this.index].id;
		}
	}
}
