import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'review-filter',
  templateUrl: './review-filter.component.html',
  styleUrls: ['./review-filter.component.css']
})
export class ReviewFilterComponent implements OnInit {
  @Output() selectResult = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
