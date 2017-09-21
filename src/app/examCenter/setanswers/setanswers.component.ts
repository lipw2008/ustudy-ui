import { Component, OnInit, ElementRef }  from '@angular/core';
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

	options = [2,3,4,5,6,7,8,9,10];

	objectives = [
		{id:1, start:1,end:20,type:1,option:4,score:1}
	];

	objectiveAnswers = [
		{no:1,type:1,option:4,answer:'A',subject:0},
		{no:2,type:1,option:4,answer:'B',subject:0},
		{no:3,type:1,option:4,answer:'C',subject:0},
		{no:4,type:1,option:4,answer:'D',subject:0},
		{no:5,type:1,option:4,answer:'A',subject:0},
		{no:6,type:1,option:4,answer:'B',subject:0},
		{no:7,type:1,option:4,answer:'C',subject:0},
		{no:8,type:1,option:4,answer:'D',subject:0},
		{no:9,type:1,option:4,answer:'A',subject:0},
		{no:10,type:1,option:4,answer:'B',subject:10},
		{no:11,type:1,option:4,answer:'A',subject:11},
		{no:12,type:1,option:4,answer:'B',subject:12},
		{no:13,type:1,option:4,answer:'C',subject:11},
		{no:14,type:1,option:4,answer:'D',subject:10},
		{no:15,type:1,option:4,answer:'A',subject:12},
		{no:16,type:1,option:4,answer:'B',subject:0},
		{no:17,type:1,option:4,answer:'C',subject:0},
		{no:18,type:1,option:4,answer:'D',subject:0},
		{no:19,type:1,option:4,answer:'A',subject:0},
		{no:20,type:1,option:4,answer:'B',subject:0}
	];

	radioScore = 20;
	checkboxScore = 0;
	judgmentScore = 0;
	objectiveScore = 20;

	subjectives = [
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
	
	addOneRow(){
		if(this.objectives.length > 0){
			const obj = this.objectives[this.objectives.length-1];
			const obj_ = {id:new Date().getTime(), start:1,end:20,type:1,option:4,score:1};
			obj_['start'] = obj['end'] + 1;
			obj_['end'] = obj_['start'];
			this.objectives.push(obj_);
	
			this.addScore(obj_);
			this.addAnswers(obj_);
		}else{
			const obj = {id:1, start:1,end:20,type:1,option:4,score:1};
			this.objectives.push(obj);

			this.addScore(obj);
			this.addAnswers(obj);
		}
	}

	removeOneRow(id){
		const _objectives = [];
		for(var i=0;i<this.objectives.length;i++){
			const objective = this.objectives[i];
			if(objective && objective['id'] !== id){
				_objectives.push(objective);
			}else{
				this.removeAnswers(objective)
				this.removeScore(objective);
			}
		}
		this.objectives = _objectives;
	}

	addAnswers(objective){
		let start = objective['start'];
		let end = objective['end'];
		let type = objective['type'];
		for(var j=start;j<=end;j++){
			const answer = {no:j,type:objective.type,option:objective.option,answer:'A',subject:0};
			this.objectiveAnswers.push(answer);
		}
	}	

	removeAnswers(objective){
		const answers = [];
		
		let start = objective['start'];
		let end = objective['end'];
		let type = objective['type'];
		for(var j=0;j<this.objectiveAnswers.length;j++){
			const answer = this.objectiveAnswers[j];
			const no = answer['no'];
			if(!(no>=start && no<=end && answer['type'] === type)){
				answers.push(answer);
			}
		}
		this.objectiveAnswers = answers;
	}

	addScore(objective){
		let start = objective['start'];
		let end = objective['end'];
		let type = objective['type'];
		let score = objective['score'];
		let total = (end+1-start)*score;
		if(type === 1){
			this.radioScore = this.radioScore + total;
		}else if(type === 2){
			this.checkboxScore = this.checkboxScore + total;
		}else if(type === 3){
			this.judgmentScore = this.judgmentScore + total;
		}
		this.objectiveScore = this.objectiveScore + total;
	}

	removeScore(objective){
		let start = objective['start'];
		let end = objective['end'];
		let type = objective['type'];
		let score = objective['score'];
		let total = (end+1-start)*score;
		if(type === 1){
			this.radioScore = this.radioScore - total;
		}else if(type === 2){
			this.checkboxScore = this.checkboxScore - total;
		}else if(type === 3){
			this.judgmentScore = this.judgmentScore - total;
		}
		this.objectiveScore = this.objectiveScore - total;
	}

	onValueChange(valueType,id){

		const _objectives = [];
		for(var i=0;i<this.objectives.length;i++){
			const obj = this.objectives[i];
			if(obj && obj['id'] === id){
				let start = obj['start'];
				let end = obj['end'];
				let type = obj['type'];
				let score = obj['score'];

				this.removeScore(obj);
				this.removeAnswers(obj);

				if(valueType === 1){
					start = Number(this.elementRef.nativeElement.querySelector('#start_' + id).value);
					obj['start'] = start;					
				}else if(valueType === 2){
					end = Number(this.elementRef.nativeElement.querySelector('#end_' + id).value);
					obj['end'] = end;
				}else if(valueType === 3){
					type = Number(this.elementRef.nativeElement.querySelector('#type_' + id).value);
					obj['type'] = type;
					if(type === 1 || type === 2){
						obj['option'] = 4;
					}else if(type === 3){
						obj['option'] = 2;
					}
				}else if(valueType === 4){
					const option = Number(this.elementRef.nativeElement.querySelector('#option_' + id).value);
					obj['option'] = option;
				}else if(valueType === 5){
					score = Number(this.elementRef.nativeElement.querySelector('#score_' + id).value);
					obj['score'] = score;
				}

				this.addScore(obj);
				this.addAnswers(obj);
			}
			_objectives.push(obj);
		}
		this.objectives = _objectives;
	}

}
