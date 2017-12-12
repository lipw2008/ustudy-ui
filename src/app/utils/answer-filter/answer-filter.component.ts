import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'answer-filter',
  templateUrl: './answer-filter.component.html',
  styleUrls: ['./answer-filter.component.css']
})
export class AnswerFilterComponent implements OnChanges {
  @Input() answer: any;
  @Output() selectResult = new EventEmitter();

  constructor() { }

  ngOnChanges() {
    this.reload();
  }

  returnResult() {
    this.selectResult.emit('')
  }

  reload() {
  }

}
