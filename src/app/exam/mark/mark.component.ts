import { Component, OnInit, AfterViewInit, ViewChild, Renderer2 }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';

declare var $: any;

@Component({
    templateUrl: 'mark.component.html'
})

export class MarkComponent implements OnInit {
	@ViewChild('questionSelector') questionSelector;
	/***** Model *****/

	markId: string;
	mark: any = {
		progress: "0%",
		groups: [
			{
				papers: [

				]
			}
		]
	};
	questionList: any;
	markQuestions: any = [];
	displayScoreBoard: boolean = true;
	groupTotalNum: number;
	curPageNum: string = "";
	curIndex: number = 0;
	markedGroupNum: number = 0;
	fullScore: string = "0";
	scoreList = [];
	scoreUnit = "1";

	editMode = "None";

	imgPath : string;
	imgPath2: string = '';
	imgPath3: string = '';
	
	markCanvas2Display: string = 'none';
	markCanvas3Display: string = 'none';

    constructor(private _sharedService: SharedService, private renderer: Renderer2, private route: ActivatedRoute) {

    }

	ngOnInit(): void {
		this.markId = this.route.snapshot.params.markId;
		this.questionList = JSON.parse(this.route.snapshot.params.questionList);
	}

    ngAfterViewInit(): void {
		console.log();
		let questionNum = this.route.snapshot.params.questionNum;
		let startNum = this.route.snapshot.params.startNum;
		let endNum = this.route.snapshot.params.endNum;
		this.markQuestions.push(questionNum === '' ? startNum + '-' + endNum : questionNum);
		console.log("init mark questions:" + this.markQuestions);
		$(this.questionSelector.nativeElement).selectpicker('val', this.markQuestions);
		$(this.questionSelector.nativeElement).on('changed.bs.select', {t: this}, this.onQuestionChange);
		this.reload();
	}

	onQuestionChange(event: any): void {
		var t = event.data.t;
		t.markQuestions = $(t.questionSelector.nativeElement).val();
		console.log("On question change: " + t.markQuestions);
		t.reload();
		// load marks data based on the mark questions.
	}

	reload(): void {
		/*load the mark information based on markQuestions
		- total progress %
		- group of papers
		*/
		this._sharedService.makeRequest('GET', 'assets/api/exams/multiMark.json', '').then((data: any) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.mark = data;
			this.groupTotalNum = this.mark.groups.length;
			if (this.groupTotalNum <= 0) {
				alert("没有可阅试卷");
			}
			this.curIndex = 0;
			this.curPageNum = "" + (this.mark.markedGroupNum + 1);
			this.markedGroupNum = this.mark.markedGroupNum;
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
		console.log("update canvas for page: " + this.curIndex);
		this.imgPath = this.mark.groups[this.curIndex].papers[0].paperImg;
		if (this.markQuestions.length >= 2) {
			this.imgPath2 = this.mark.groups[this.curIndex].papers[1].paperImg;
		}
		if (this.markQuestions.length == 3) {
			this.imgPath3 = this.mark.groups[this.curIndex].papers[2].paperImg;
		}
	}

	updateFullScore(): void {
		console.log("before update full score: " + this.fullScore);
		console.log("before update full score - mark: " + JSON.stringify(this.mark));
		for(let paper of this.mark.groups[this.curIndex].papers) {
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
		for(let paper of this.mark.groups[this.curIndex].papers) {
			if (paper.steps.length === 0 && paper.score === "") {
				paper.score = score;
				this.updateFullScore();
				return;
			} else if (paper.steps.length > 0) {
				for(let step of paper.steps) {
					if (step.score === "") {
						step.score = score;
						this.updateFullScore();
						return;
					} 
				}
			}
		}
	}

	firstPage(): void {

	}

	previousPage(): void {

	}

	nextPage(): void {
		this.curIndex++;
		this.curPageNum = "" + (Number(this.curPageNum) + 1);
		this.updateCanvas();
		this.updateFullScore();
	}

	lastPage(): void {

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

/*
	addBestAnswer(): void {
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			t.cxt.drawImage(t.img, 0, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCxt.drawImage(t.img, 0, 0, t.img.width, t.img.height);
		}
		this.img.src = 'assets/images/icon-bestanswer.png';
	}

	addFAQ(): void {
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			t.cxt.drawImage(t.img, 80, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCxt.drawImage(t.img, 80, 0, t.img.width, t.img.height);
		}
		this.img.src = 'assets/images/icon-faq.png';
	}

	addQueerAnswer(): void {
		this.img = new Image();
		let t = this;
		this.img.onload = function() {
			t.cxt.drawImage(t.img, 160, 0, t.img.width, t.img.height);

			//hidden canvas
			t.hCxt.drawImage(t.img, 160, 0, t.img.width, t.img.height);
		}
		this.img.src = 'assets/images/icon-queerflower.png';
	}
	*/
}