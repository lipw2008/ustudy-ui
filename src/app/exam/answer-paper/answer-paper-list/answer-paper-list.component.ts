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

  getQuestionName(question: any) {
    if (question.quesno) {
      return question.quesno
    } else {
      return `${question.startno}-${question.endno}`
    }
  }
}
