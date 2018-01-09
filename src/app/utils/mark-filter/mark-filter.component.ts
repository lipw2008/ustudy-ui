import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mark-filter',
  templateUrl: './mark-filter.component.html',
  styleUrls: ['./mark-filter.component.css']
})
export class MarkFilterComponent implements OnInit {
  @Output() selectResult = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
