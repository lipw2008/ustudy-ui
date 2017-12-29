import { Component, OnInit, AfterViewInit, ViewChild, Renderer2 }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from './problem.service';
import { SharedService } from '../../shared.service';

declare var $: any;

@Component({
    templateUrl: 'problem.component.html'
})

export class ProblemComponent implements OnInit {
	@ViewChild('paperContainer') paperContainer;

	egsId: any;

	papers = [];
	curPaper = {
		paperid: 0,
		examCode: '',
		paperImgs: [],
		questions: []
	};

	curPage: number;
	pageCount: number;
	firstPageEnabled = "";
	prePageEnabled = "";		
	nextPageEnabled = "";
	lastPageEnabled = "";		

    constructor(private _sharedService: SharedService, private _problemService: ProblemService, private renderer: Renderer2, private route: ActivatedRoute) {

    }

	ngOnInit(): void {
		this.egsId = this.route.snapshot.params.egsId;
		this.reload();
	}

    ngAfterViewInit(): void {

	}

	reload(): void {
		this._sharedService.makeRequest('GET', '/exam/exception/paper/' + this.egsId, '').then((data: any) => {
		//this._sharedService.makeRequest('GET', 'assets/api/exams/singleMark.json', '').then((data: any) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.papers = data.data;
			for(let paper of this.papers) {
				paper.paperImgs = paper.paperImg.split(',');
			}
			this.pageCount = this.papers.length;
			console.log("page count" + this.pageCount);
			if (this.pageCount <= 0) {
				alert("没有异常卷");
				return;
			}
			this.curPage = 1;
			this.curPaper = this.papers[0];

			this.firstPageEnabled = "disabled";
			this.prePageEnabled = "disabled";
			this.nextPageEnabled = "";
			this.lastPageEnabled = "";

			this.updateCanvas();
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("无法加载试卷");
		});
	}	

	updateCanvas(): void {

	}

	firstPage(): void {
		this.curPage = 1;
		this.curPaper = this.papers[this.curPage-1];
		this.firstPageEnabled = "disabled";
		this.prePageEnabled = "disabled";
		this.nextPageEnabled = "";
		this.lastPageEnabled = "";
		this.updateCanvas();
	}

	previousPage(): void {
		if (this.curPage === 2) {
			this.firstPageEnabled = "disabled";
			this.prePageEnabled = "disabled";
			this.nextPageEnabled = "";
			this.lastPageEnabled = "";
		} else if (this.curPage <= 1) {
			return;
		} else {
			this.firstPageEnabled = "";
			this.prePageEnabled = "";
			this.nextPageEnabled = "";
			this.lastPageEnabled = "";
		}
		
		this.curPage--;
		this.curPaper = this.papers[this.curPage-1];

		this.updateCanvas();
	}

	nextPage(): void {
		if (this.curPage + 1 === this.pageCount) {
			this.firstPageEnabled = "";
			this.prePageEnabled = "";
			this.nextPageEnabled = "disabled";
			this.lastPageEnabled = "disabled";
		}

		this.curPage++;
		this.curPaper = this.papers[this.curPage-1];
		this.firstPageEnabled = "";
		this.prePageEnabled = "";					
		this.updateCanvas();
	}

	lastPage(): void {
		this.curPage = this.pageCount;
		this.curPaper = this.papers[this.curPage-1];
		this.firstPageEnabled = "";
		this.prePageEnabled = "";					
		this.nextPageEnabled = "disabled";
		this.lastPageEnabled = "disabled";
		this.updateCanvas();
	}

	submit(): void {
		let paper = {
			egsId : 0,
			examCode : '',
			answers: []
			// paperid, quesno, answer
		};

		paper.egsId = this.egsId;
		paper.examCode = this.curPaper.examCode;
		for (let question of this.curPaper.questions) {
			let answer = {
				paperid: 0,
				quesno: '',
				answer: ''
			};
			answer.paperid = this.curPaper.paperid;
			answer.quesno = question.quesno;
			answer.answer = question.answer;
			paper.answers.push(answer);
		}
		this._sharedService.makeRequest('POST', '/exam/paper', JSON.stringify(paper)).then((data: any) => {
			this.nextPage();
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("修改失败！");
		});
	}

	clear(): void {
		for(let question of this.curPaper.questions) {
			question.answer="";
		}
	}
}