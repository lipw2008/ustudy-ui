import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-paper-list',
  templateUrl: './answer-paper-list.component.html',
  styleUrls: ['./answer-paper-list.component.css']
})
export class AnswerPaperListComponent implements OnInit {
  subjects = [];

  constructor() { }

  ngOnInit() {
  
  }

  stringify(j) {
    return JSON.stringify(j);
  }
}
