import { Component, OnInit}  from '@angular/core';

import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'mark-list.component.html'
})

export class MarkListComponent implements OnInit {

	marks: any;

    constructor(private _sharedService: SharedService) {

    }

    ngOnInit(): void {
    	this.reload();
	}

	reload(): void {
		this._sharedService.makeRequest('GET', 'assets/api/exams/marklist.json', '').then((data: any) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.marks = data;
			for (let mark of this.marks) {
				if (mark.questionType === "填空题") {
					mark.title = mark.startNum + '-' + mark.endNum + '题';
				} else {
					mark.title = mark.questionNum + '题';
				}
			}
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}
}