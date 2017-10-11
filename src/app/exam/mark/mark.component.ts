import { Component, OnInit, AfterViewInit, ViewChild, Renderer2 }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';

declare var $: any;

@Component({
    templateUrl: 'mark.component.html'
})

export class MarkComponent implements OnInit {
	//Dom elements
	@ViewChild('questionSelector') questionSelector;
	@ViewChild('markContainer') markContainer;
	@ViewChild('rootContainer') rootContainer;

	//request content
	reqContent: any = {
		examId: "",
		subject: "",
		grade: "",
		groupNo: {
			"start": -1,
			"end": -1
		}
	}

	// mark content
	mark: any = {
		progress: "0%",
		groups: [
			{
				papers: [

				]
			}
		]
	};

	// question selector
	questionList: any;
	markQuestions: any = [];
	
	// score board
	displayScoreBoard: boolean = true;
	fullScore: string = "0";
	scoreList = [];
	scoreUnit = "1";
	autoSubmit = false;

	// page controller
	curPage: number = 0;
	pageCount: number = 0; 

	// canvas
	editMode: string = "None";
	score: string = "";
	score2: string = "";
	score3: string = "";
	imgPath : string;
	imgPath2: string = '';
	imgPath3: string = '';
	markCanvas2Display: string = 'none';
	markCanvas3Display: string = 'none';

    constructor(private _sharedService: SharedService, private renderer: Renderer2, private route: ActivatedRoute) {

    }

	ngOnInit(): void {
		this.reqContent.examId = this.route.snapshot.params.examId;
		this.reqContent.subject = this.route.snapshot.params.subject;
		this.reqContent.grade = this.route.snapshot.params.grade;
		this.questionList = JSON.parse(this.route.snapshot.params.questionList);
	}

    ngAfterViewInit(): void {
		console.log();
		this.markQuestions.push(this.route.snapshot.params.questionName);
		console.log("init mark questions:" + this.markQuestions);
		$(this.questionSelector.nativeElement).selectpicker('val', this.markQuestions);
		$(this.questionSelector.nativeElement).on('changed.bs.select', {t: this}, this.onQuestionChange);
		this.reload();
	}

	onQuestionChange(event: any): void {
		var t = event.data.t;
		t.markQuestions = $(t.questionSelector.nativeElement).val();
		console.log("On question change: " + t.markQuestions);
		// load marks data based on the mark questions.
		t.reload();
	}

	reload(): void {
		/*load the mark information based on markQuestions
		- total progress %
		- group of papers
		*/
		// send the examId, subject, grade and groupNo(optional) to the server side
		this._sharedService.makeRequest('GET', 'assets/api/exams/multiMark.json', '').then((data: any) => {
			this.reqContent.groupNo.start = -1;
			this.reqContent.groupNo.end = -1;

			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.mark = data;
			this.pageCount = this.mark.groups.length;
			if (this.pageCount <= 0) {
				alert("没有可阅试卷");
				return;
			}
			if (this.reqContent.groupNo.start === -1 && this.reqContent.groupNo.end === -1) {
				this.curPage = this.mark.groups[0].groupNo;
			}

			if (this.markQuestions.length == 1) {
				this.markCanvas2Display = 'none';
				this.markCanvas3Display = 'none';
			}
			if (this.markQuestions.length >= 2) {
				this.markCanvas2Display = 'block';
			}
			if (this.markQuestions.length == 3) {
				this.markCanvas3Display = 'block';
			}
			this.updateCanvas();
			this.updateFullScore();
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}	

	updateCanvas(): void {
		console.log("update canvas for page: " + this.curPage);
		for (let group of this.mark.groups) {
			if (group.groupNo === this.curPage) {
				this.imgPath = group.papers[0].paperImg;
				if (this.markQuestions.length >= 2) {
					this.imgPath2 = group.papers[1].paperImg;
				}
				if (this.markQuestions.length == 3) {
					this.imgPath3 = group.papers[2].paperImg;
				}
			}
		}
		console.log(this.imgPath + this.imgPath2 + this.imgPath3);
		this.score = this.score2 = this.score3 = "阅卷老师：" + this.mark.teacherId + " 得分：";
	}

	updateFullScore(): void {
		console.log("before update full score: " + this.fullScore);
		console.log("before update full score - mark: " + JSON.stringify(this.mark));
		for (let group of this.mark.groups) {
			if (group.groupNo === this.curPage) {
				for(let paper of group.papers) {
					if (paper.isProblemPaper === true) {
						continue;
					}
					if (paper.steps.length === 0 && paper.score === "") {
						this.fullScore = paper.fullScore;
						console.log("after update full score: " + this.fullScore);
						this.updateScoreBoard();
						return;
					} else if (paper.steps.length > 0) {
						for(let step of paper.steps) {
							if (step.score === "") {
								this.fullScore = step.fullScore;
								console.log("after update full score: " + this.fullScore);
								this.updateScoreBoard();
								return;
							} 
						}
					}
				}
			}
		}
		if(this.autoSubmit === true) {
			this.submit();
		}
	}

	setScoreUnit(unit): void {
		this.scoreUnit = unit;
		this.updateScoreBoard();
	}

	updateScoreBoard(): void {
		this.scoreList = [];
		var score = Number(this.fullScore); 
		var unit = parseFloat(this.scoreUnit);
		for (var i=0; i<=score; i+=unit) {
			this.scoreList.push(i);
		}
		console.log(this.scoreList);
	}

	setFullScore(): void {
		this.setScore(this.fullScore);
	}

	setZeroScore(): void {
		this.setScore("0");
	}

	setScore(score: string): void {
		for (let group of this.mark.groups) {
			if (group.groupNo === this.curPage) {
				for(let paper of group.papers) {
					if (paper.isProblemPaper === true) {
						continue;
					}
					if (paper.steps.length === 0 && paper.score === "") {
						if (score !== 'PROBLEM') {
							paper.score = score;
						} else {
							paper.isProblemPaper = true;
						}
						this.updateFullScore();
						return;
					} else if (paper.steps.length > 0) {
						for(let step of paper.steps) {
							if (step.score === "") {
								if (score !== 'PROBLEM') {
									step.score = score;
								} else {
									paper.isProblemPaper = true;
								}
								this.updateFullScore();
								return;
							} 
						}
					}
				}
			}
		}
	}

	firstPage(): void {

	}

	previousPage(): void {
		this.curPage--;
		if (this.curPage < this.mark.groups[0].groupNo) {
			this.reqContent.groupNo.start = (this.curPage - 10 < 0 ? 0 : this.curPage - 10);
			this.reqContent.groupNo.end = this.curPage;
			this.reload();
		} else {
			this.updateCanvas();
			this.updateFullScore();
		}
	}

	nextPage(): void {
		this.curPage++;
		if (this.curPage > this.mark.groups[this.pageCount - 1].groupNo) {
			this.reload();
		} else {
			this.updateCanvas();
			this.updateFullScore();
		}
	}

	lastPage(): void {

	}

	submit(): void {
		for (let group of this.mark.groups) {
			if (group.groupNo === this.curPage) {
				if (group.papers[0].score !== "") {
					this.score += group.papers[0].score + "/" + group.papers[0].fullScore;
				} else {
					for (let step of group.papers[0].steps) {
						this.score += step.score + "/" + step.fullScore + " ";
					}
				}
				if (this.markQuestions.length >= 2) {
					if (group.papers[1].score !== "") {
						this.score2 += group.papers[1].score + "/" + group.papers[1].fullScore;
					} else {
						for (let step of group.papers[1].steps) {
							this.score2 += step.score + "/" + step.fullScore + " ";
						}
					}
				}
				if (this.markQuestions.length == 3) {
					if (group.papers[2].score !== "") {
						this.score3 += group.papers[2].score + "/" + group.papers[2].fullScore;
					} else {
						for (let step of group.papers[2].steps) {
							this.score3 += step.score + "/" + step.fullScore + " ";
						}
					}
				}
			}
		}
		this.addScore();
		this._sharedService.makeRequest('POST', '/exam/mark/update', JSON.stringify(this.mark)).then((data: any) => {
			alert("修改成功");
			this.nextPage();
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("修改失败！");
		});
	}

	drawLine(): void {
		this.editMode = 'Line';
	}

	drawCircle(): void {
		this.editMode = 'Circle';
	}

	drawText(): void {
		this.editMode = 'Text';
	}

	addLike(): void {
		this.editMode = 'Like';
	}

	addHelp(): void {
		this.editMode = 'Help';
	}

	addBestAnswer(): void {
		this.editMode = "BestAnswer";
	}

	addFAQ(): void {
		this.editMode = "FAQ";
	}

	addQueerAnswer(): void {
		this.editMode = "QueerAnswer";
	}

	addScore(): void {
		this.editMode = "Score";
	}

	clear(): void {
		this.editMode = "Clear";
	}
}