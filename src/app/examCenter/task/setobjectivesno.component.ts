import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'setobjectivesno.component.html'
})

export class SetObjectivesNoComponent implements OnInit {

	errorMessage: string;

	examId: string;
	gradeId: string;
	subjectId: string;
	seted: boolean;
	
	objectivesNos = [];

	constructor(private _sharedService: SharedService, public fb: FormBuilder, private elementRef: ElementRef, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
		this.examId = this.route.snapshot.params.examId;
		this.gradeId = this.route.snapshot.params.gradeId;
		this.subjectId = this.route.snapshot.params.subjectId;
		this.seted = this.route.snapshot.params.seted;

		this.initObjectivesNos(10);
	}

	initObjectivesNos(size){
		this.objectivesNos = [];
		let max = 20;
		if(size > max){
			max = size;
		}
		for (var i=1; i <= max; i++) {
			if (i <= size) {
				this.objectivesNos.push({no:i, selected:true});
			}else{
				this.objectivesNos.push({no:i, selected:false});
			}
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

	closeModal(){
		this.elementRef.nativeElement.querySelector('#infoModal').style.display = 'none';
	}

	selectOne(no) {
		this.objectivesNos.forEach(element => {
			if (element.no === no) {
				if (element.selected) {
					element.selected = false;
				} else {
					element.selected = true;
				}
			}
		});
	}

	addOneNo(){
		this.objectivesNos.push({no:this.objectivesNos.length + 1, selected:false});
	}

	resetSelectCount(){
		let size = parseInt(this.elementRef.nativeElement.querySelector('#objective_nos_count').value);
		this.initObjectivesNos(size);
	}

	commitObjectives(){
		//commit 

		this.router.navigate(['taskallocation', {examId: this.examId, gradeId: this.gradeId, subjectId: this.subjectId, seted: this.seted}]);
	}

}
