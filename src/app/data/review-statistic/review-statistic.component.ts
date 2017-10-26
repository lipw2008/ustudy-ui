import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-statistic',
  templateUrl: './review-statistic.component.html',
  styleUrls: ['./review-statistic.component.css']
})
export class ReviewStatisticComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectResult(result) {
    console.log(result)
    // XXX: mock
  }
}
