import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-review-statistic',
  templateUrl: './review-statistic.component.html',
  styleUrls: ['./review-statistic.component.css']
})
export class ReviewStatisticComponent implements OnInit {
  exams: any;

  constructor(private _sharedService: SharedService) { }

  ngOnInit(): void {
  }

  selectResult(result) {
    console.log(result);
    // XXX: mock

    this._sharedService.makeRequest('GET', 'assets/api/exams/exams.json', '').then((data: any) => {
      this.exams = data
    })
  }

}
