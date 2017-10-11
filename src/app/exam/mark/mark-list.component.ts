import { Component, OnInit}  from '@angular/core';

import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'mark-list.component.html'
})

export class MarkListComponent implements OnInit {

	marks: any;
	questionList = [];

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
					let question = {"n": ""};
					question.n = mark.summary[0].questionName;
					this.questionList.push(question);
				}
			}
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}
}