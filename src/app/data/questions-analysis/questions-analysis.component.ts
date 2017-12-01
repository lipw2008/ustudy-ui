import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-questions-analysis',
  templateUrl: './questions-analysis.component.html',
  styleUrls: ['./questions-analysis.component.css']
})
export class QuestionsAnalysisComponent implements OnInit {
  tab: String = 'summary';
  private quesanswers: any;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  selectResult(result) {
    this._dataService.getAnswers().then((data) => {
      this.quesanswers = data
    })
  }

  getHighestScore() {
    return _.max(_.map(this.quesanswers, 'score'))
  }

  getLowestScore() {
    return _.min(_.map(this.quesanswers, 'score'))
  }

  getAvg() {
    const scores = _.map(this.quesanswers, 'score');
    return _.sum(scores) / scores.length
  }
}
