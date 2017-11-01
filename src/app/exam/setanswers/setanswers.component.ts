import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'setanswers.component.html'
})

export class SetAnswersComponent implements OnInit {

	errorMessage: string;

	egsId: string;
	examId: string;
	gradeId: string;
	subjectId: string;
	seted: boolean;	

	issynthesize = false;

	currentCheckBox = 2;

	options = [2,3,4,5,6,7,8,9,10];

	checkBoxScores = [];

	allsubjects = [];

	subjects = [
		{id:0,name:'不分科'}
	];

	selectOptions = ['A','B','C','D','E','F','G','H','I','J'];

	objectives = [
		{id:1, quesno:0, startno:1,endno:2,type:'单选题',choiceNum:4,score:1},
		{id:2, quesno:0, startno:3,endno:4,type:'多选题',choiceNum:6,score:1},
		{id:3, quesno:0, startno:5,endno:6,type:'判断题',choiceNum:2,score:1}
	];

	objectiveAnswers = [];

	radioScore = 0;
	checkboxScore = 0;
	judgmentScore = 0;
	objectiveScore = 0;

	constructor(private _sharedService: SharedService, public fb: FormBuilder, private elementRef: ElementRef, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
		this.egsId = this.route.snapshot.params.egsId;
		this.examId = this.route.snapshot.params.examId;
		this.gradeId = this.route.snapshot.params.gradeId;
		this.subjectId = this.route.snapshot.params.subjectId;
		this.seted = this.route.snapshot.params.seted;

		this.loaAlldSubjects();

		this.allsubjects.forEach(subject => {
			if (this.subjectId === subject.id) {
				if (subject.type === '1' || subject.type === '2') {
					this.issynthesize = true;
					this.allsubjects.forEach(subject_ => {
						if (subject.type === '1' && subject_.type === '3') {
							this.subjects.push(subject_);
						} else if (subject.type === '2' && subject_.type === '4') {
							this.subjects.push(subject_);
						}
					})
				}
			}
		});

		if(this.seted){
			this.getQuesAnswers(this.egsId, this.examId, this.gradeId, this.subjectId);
		}

		this.objectives.forEach(objective => {
			this.addAnswers(objective);
			this.setDefaultCheckBoxScore(objective);			
		});
		
	}

	resetDatas(){

		this.objectiveAnswers = [];

		this.radioScore = 0;
		this.checkboxScore = 0;
		this.judgmentScore = 0;
		this.objectiveScore = 0;

		const objectives_ = [];
		this.objectives.forEach(objective => {
			if(objective.startno === 0 && objective.endno === 0){
				objective.startno = objective.quesno;
				objective.endno = objective.quesno;
			}
			objectives_.push(objective);
			this.addAnswers(objective);
			this.setDefaultCheckBoxScore(objective);			
		});
		this.objectives = objectives_;

		var subjectives_ = [];
		this.subjectives.forEach(subjective => {
			subjective.branch = '不分科';
			if(subjective.type !== '填空题'){
				if(subjective.quesno !== 0){
					subjective.startno = subjective.quesno;
					subjective.endno = subjective.quesno;
					subjectives_.push(subjective);
				}else{
					if(subjective.startno !== 0){
						if(subjective.endno === 0){
							subjective.endno = subjective.startno;
							subjective.quesno = subjective.startno;
							subjectives_.push(subjective);
						}else{
							const start = subjective.startno;
							const end = subjective.endno;
							for(var i=start; i<=end; i++){
								var obj = '{"id":'+new Date().getTime()+',"type":"'+subjective.type+'","startno":'+i+',"endno":'+i+',"quesno":'+i+',"branch":"不分科","score":'+subjective.score+'}';
								subjectives_.push(JSON.parse(obj));
							}
						}
					}else if(subjective.endno !== 0){
						subjective.startno = subjective.endno;
						subjective.quesno = subjective.endno;
						subjectives_.push(subjective);
					}
				}
			}else{
				if(subjective.startno === 0 || subjective.endno === 0){
					subjective.startno = subjective.quesno;
					subjective.endno = subjective.quesno;
				}
				subjectives_.push(subjective);
			}
		});

		this.subjectives = subjectives_;
		this.setSubjectivesScore();
	}

	loaAlldSubjects() {
		this._sharedService.makeRequest('GET', '/api/subject/getSubjects', '').then((data: any) => {
			console.log("data: " + JSON.stringify(data));
			if (data.success) {
				this.allsubjects = data.data; 
			}
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}
	
	getQuesAnswers(egsId,examId,gradeId,subjectId) {
		this._sharedService.makeRequest('GET', '/api/setanswers/getAnswers/' + egsId, '').then((data: any) => {
			if (data.success) {
				data = data.data;
				const refAnswers = data.refAnswers;
				const quesAnswers = data.quesAnswers;
				const quesAnswerDivs = data.quesAnswerDivs;

				this.objectives = [];
				this.subjectives = [];
				quesAnswers.forEach(quesAnswer => {
					let type = quesAnswer['type'];
					if (type === '单选题' || type === '多选题' || type === '判断题') {
						this.objectives.push(quesAnswer);
					}else{
						quesAnswer.branch = '不分科';
						this.subjectives.push(quesAnswer);
					}
				});

				this.resetDatas();

				console.log("refAnswers: " + JSON.stringify(refAnswers));
				console.log("quesAnswers: " + JSON.stringify(quesAnswers));
				console.log("quesAnswerDivs: " + JSON.stringify(quesAnswerDivs));
				//this.allsubjects = data.data; 
			}
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}
	
	addOneRow(){
		if(this.objectives.length > 0){
			const obj = this.objectives[this.objectives.length-1];
			const obj_ = {id:new Date().getTime(), quesno:0, startno:1, endno:20, type:'单选题', choiceNum:4, score:1, branch:'不分科'};
			obj_['startno'] = obj['endno'] + 1;
			obj_['endno'] = obj_['startno'];
			this.objectives.push(obj_);
	
			this.addAnswers(obj_);
		}else{
			const obj = {id:1, quesno:0, startno:1,endno:20, type:'单选题', choiceNum:4,score:1, branch:'不分科'};
			this.objectives.push(obj);

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

		let type = objective['type'];
		if (type === '单选题' || type === '多选题' || type === '判断题') {

			let start = objective['startno'];
			if(start === 0){
				start = objective['quesno'];
			}
			let end = objective['endno'];
			if(end === 0){
				end = objective['quesno'];
			}
			let score = objective['score'];
			let totalScore = (end - start + 1) * score; 
			this.objectiveScore = this.objectiveScore + totalScore;		
			
			let choiceNum = objective.choiceNum;
			let _option = [];
			
			if(type === '判断题'){
				_option.push({name:'Y',checked:true});
				_option.push({name:'N',checked:false});
			}else{
				for(var i=0; i<choiceNum; i++){
					let checked = false;
					if(i === 0) checked = true;
					_option.push({name:this.selectOptions[i],checked:checked});
				}
			}

			for(var j=start;j<=end;j++){
				const answer = {quesno:j, type:objective.type, option:objective.choiceNum, options:_option, answer:'A', branch:'不分科'};
				if(type === '判断题'){
					answer.answer = 'Y';
				}
				this.objectiveAnswers.push(answer);
			}

			if (type === '单选题') {
				this.radioScore = this.radioScore + totalScore;
			} else if(type === '多选题'){
				this.checkboxScore = this.checkboxScore + totalScore;
			} else if(type === '判断题'){
				this.judgmentScore = this.judgmentScore + totalScore;
			}

			this.objectiveAnswers.sort(function(a,b){
				return a.quesno - b.quesno;
			});
		}
	}	

	removeAnswers(objective){
		const answers = [];
		
		let start = objective['startno'];
		let end = objective['endno'];
		let type = objective['type'];
		for(var j=0;j<this.objectiveAnswers.length;j++){
			const answer = this.objectiveAnswers[j];
			const quesno = answer['quesno'];
			if(!(quesno>=start && quesno<=end && answer['type'] === type)){
				answers.push(answer);
			}
		}
		this.objectiveAnswers = answers;
	}

	removeScore(objective){
		let start = objective['startno'];
		let end = objective['endno'];
		let type = objective['type'];
		let score = objective['score'];
		let total = (end+1-start)*score;
		if(type === '单选题'){
			this.radioScore = this.radioScore - total;
		}else if(type === '多选题'){
			this.checkboxScore = this.checkboxScore - total;
		}else if(type === '判断题'){
			this.judgmentScore = this.judgmentScore - total;
		}
		this.objectiveScore = this.objectiveScore - total;
	}

	onValueChange(valueType,id){

		const _objectives = [];
		for(var i=0;i<this.objectives.length;i++){
			const obj = this.objectives[i];
			if(obj && obj['id'] === id){
				let start = obj['startno'];
				let end = obj['endno'];
				let type = obj['type'];
				let score = obj['score'];

				this.removeScore(obj);
				this.removeAnswers(obj);

				if(valueType === 1){
					start = Number(this.elementRef.nativeElement.querySelector('#start_' + id).value);
					obj['startno'] = start;					
				}else if(valueType === 2){
					end = Number(this.elementRef.nativeElement.querySelector('#end_' + id).value);
					obj['endno'] = end;
				}else if(valueType === 3){
					type = this.elementRef.nativeElement.querySelector('#type_' + id).value;
					obj['type'] = type;
					if(type === '单选题' || type === '多选题'){
						obj['choiceNum'] = 4;
					}else if(type === '判断题'){
						obj['choiceNum'] = 2;
					}
				}else if(valueType === 4){
					const choiceNum = Number(this.elementRef.nativeElement.querySelector('#option_' + id).value);
					obj['choiceNum'] = choiceNum;
				}else if(valueType === 5){
					score = Number(this.elementRef.nativeElement.querySelector('#score_' + id).value);
					obj['score'] = score;
				}

				//this.addScore(obj);
				this.addAnswers(obj);
				this.setDefaultCheckBoxScore(obj);
			}
			_objectives.push(obj);
		}
		this.objectives = _objectives;
	}

	setAnswersOption(id, type, value){
		this.objectiveAnswers.forEach(answer => {
			if(answer.quesno === id && answer.type === type){
				if(type === '多选题'){
					let ans = answer.answer;
					if(ans.indexOf(value)>=0){
						ans = ans.replace(','+value,'');
						ans = ans.replace(value,'');
						if(ans.indexOf(',') === 0){
							ans = ans.substring(1);
						}
						answer.answer = ans;
					}else{
						answer.answer = ans + ',' + value;
					}
				}else{
					answer.answer = value;
				}
			}
		});
	}

	setAnswersSubject(id, type){
		let value = this.elementRef.nativeElement.querySelector('#answersSubject_' + id).value;
		this.objectiveAnswers.forEach(answer => {
			if(answer.quesno === id && answer.type === type){
				answer.subject = value;				
			}
		});
	}

	//-------------------------------Subjectives--------------------------------------

	subjectives = [
		{id:1, quesno:0, type:'填空题', startno:1, endno:10, branch:'不分科', score:2}
	];

	subjectiveCount = 0;
	subjectiveScore = 0;

	setSubjectivesScore(){
		
		this.subjectiveCount = 0;
		this.subjectiveScore = 0;

		this.subjectives.forEach(subjective => {
			var count = subjective.endno - subjective.startno + 1;
			this.subjectiveCount += count;
			this.subjectiveScore += count*subjective.score;
		})
	}

	addOneSubjectiveRow(id) {
		if (this.subjectives.length > 0) {
			if (id > 0){
				this.subjectives.forEach(subjective => {
					if(subjective.id === id){
						let childs = subjective['child'];
						if(!childs){
							childs = [];
						}
						let child = {id:1, quesno:0,type:'填空题',branch:'不分科',score:1};
						child.id = childs.length + 1;
						child.type = subjective.type;
						child.branch = subjective.branch;
						childs.push(child);

						subjective['child'] = childs;
					}
				});
			} else {
				const obj = this.subjectives[this.subjectives.length-1];
				const obj_ = {id:new Date().getTime(), quesno:0, type:'填空题', startno:1, endno:10, branch:'不分科', score:2};
				if(obj['type'] === '填空题') obj_['startno'] = obj['endno'] + 1;
				else obj_['startno'] = obj['startno'] + 1;
				obj_['endno'] = obj_['startno'];
				this.subjectives.push(obj_);

				this.subjectiveCount = this.subjectiveCount + 1;
				this.subjectiveScore = this.subjectiveScore + 2;
			}

		}else{
			const obj = {id:new Date().getTime(), quesno:0, type:'填空题', startno:1, endno:1, branch:'不分科', score:1};
			if (this.objectives.length > 0) {
				let objective = this.objectives[this.objectives.length - 1];
				obj.startno = objective.endno + 1;
				obj.endno = objective.endno + 1;
			}
			this.subjectives.push(obj);

			this.subjectiveCount = 1;
			this.subjectiveScore = 1;
		}
	}

	removeOneSubjectiveRow(id, childId) {
		const _subjectives = [];
		for (var i=0;i<this.subjectives.length;i++) {
			const subjective = this.subjectives[i];
			if (subjective && subjective['id'] !== id) {
				_subjectives.push(subjective);
			} else if(childId > 0) {
				let child = subjective['child'];
				const _child = [];
				child.forEach(element => {
					if(element.id !== childId){
						element.id = _child.length + 1;
						_child.push(element);
					}
				});
				subjective['child'] = _child;

				_subjectives.push(subjective);
			} else {
				this.subjectiveCount = this.subjectiveCount - 1;
				if (subjective.type === '填空题'){
					this.subjectiveScore = this.subjectiveScore - (subjective.endno - subjective.startno + 1) * subjective.score;
				} else {
					this.subjectiveScore = this.subjectiveScore - subjective.score;
				}
			}
		}

		this.subjectives = _subjectives;
	}

	onSubjectiveValueChange(valueType, id, childId) {
		this.subjectives.forEach(subjective => {
			if (subjective.id === id) {
				if (childId > 0) {
					let childs = subjective['child'];
					childs.forEach(child => {
						if (child.id === childId) {
							let value = Number(this.elementRef.nativeElement.querySelector('#subjective_'+valueType + '_' + id +'_' + childId).value);
							child[valueType] = value;
						}
					});
				} else {
					
					let value = Number(this.elementRef.nativeElement.querySelector('#subjective_'+valueType+'_' + id).value);
					if (valueType === 'start') {
						if(subjective.type === '填空题'){
							this.subjectiveCount = this.subjectiveCount + subjective.startno - value;
							this.subjectiveScore = this.subjectiveScore + (subjective.startno - value) * subjective.score
						}
					} else if (valueType === 'end') {
						this.subjectiveCount = this.subjectiveCount - subjective.startno + value;
						this.subjectiveScore = this.subjectiveScore + (value - subjective.endno ) * subjective.score
					} else if (valueType === 'type') {
						if(subjective.type === '填空题' || value === 4){
							if (subjective.type === '填空题') {
								this.subjectiveCount = this.subjectiveCount - subjective.endno + subjective.startno;
								this.subjectiveScore = this.subjectiveScore - (subjective.endno - subjective.startno) * subjective.score
							} else {
								this.subjectiveCount = this.subjectiveCount + subjective.endno - subjective.startno;
								this.subjectiveScore = this.subjectiveScore + (subjective.endno - subjective.startno) * subjective.score
							}
						}
					} else if (valueType === 'score') {
						if(subjective.type === '填空题'){
							this.subjectiveScore = this.subjectiveScore + (subjective.endno - subjective.startno + 1) * (value - subjective.score)
						} else {
							this.subjectiveScore = this.subjectiveScore + value - subjective.score;
						}
					}
					
					subjective[valueType] = value;
				}
			}
		});
	}

	showCheckBoxScore(){
		this.elementRef.nativeElement.querySelector('#infoModal').style.display = '';
	}

	closeCheckBoxModal(){
		this.elementRef.nativeElement.querySelector('#infoModal').style.display = 'none';
	}

	setDefaultCheckBoxScore(objective){
		if (objective.type === 2) {
			this.checkBoxScores = [];
			let optionSize = objective['choiceNum'];
	
			for (var i=2;i <= optionSize; i++) {
				let scores_ = [];
				for (var j=1; j < i; j++) {
					scores_.push({count:j, score:0});
				}
				this.checkBoxScores.push({size:i, seted:false, scores:scores_});
			}
		}
	}

	setCheckBoxScore(size, count){
		let score = this.elementRef.nativeElement.querySelector('#checkBoxScore_' + size + '_' + count).value;
		this.checkBoxScores.forEach(element => {
			if (element.size === size) {
				element.scores.forEach(element_ => {
					if (element_.count === count) {
						element_.score = score;
					}
				});
			}
		});
	}

	setNextCheckBoxScore(){
		this.checkBoxScores.forEach(element => {
			if (element.size === this.currentCheckBox) {
				element.seted = true;
			}
		});

		if (this.currentCheckBox < this.checkBoxScores[this.checkBoxScores.length -1].size) {
			this.currentCheckBox = this.currentCheckBox + 1;
		}
	}

	setCurrentCheckBoxScore(size){
		this.currentCheckBox = size;
	}

	commitDatas(){
		var data = {};
		data['objectives'] = this.objectives;
		data['subjectives'] = this.subjectives;
		data['objectiveAnswers'] = this.objectiveAnswers;
		console.error(this.objectiveAnswers);
		this._sharedService.makeRequest('POST', '/api/setanswers/saveAnswers/' + this.egsId, JSON.stringify(data)).then((data: any) => {
			if (data.success) {
				alert("保存成功！");
			}
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}

}
