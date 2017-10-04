import { Component, OnInit}  from '@angular/core';

import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'mark-list.component.html'
})

export class MarkListComponent implements OnInit {

	marks: any;
	questionList = [];
	questionNum = "";

    constructor(private _sharedService: SharedService) {

    }

    ngOnInit(): void {
    	this.reload();
	}

	stringify(j) {
		return JSON.stringify(j);
	}

	reload(): void {
		this._sharedService.makeRequest('GET', 'assets/api/exams/marklist.json', '').then((data: any) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.marks = data;
			for (let mark of this.marks) {
				if (mark.markType === "标准") {
					let questionNum = (mark.questionNum === '' ? mark.startNum + '-' + mark.endNum : mark.questionNum);
					let question = {"num": ""};
					question.num = questionNum;
					this.questionList.push(question);
				}
			}
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}
}