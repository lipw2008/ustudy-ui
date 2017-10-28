import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {DataService} from '../data.service';

@Component({
  selector: 'app-review-quality',
  templateUrl: './review-quality.component.html',
  styleUrls: ['./review-quality.component.css']
})
export class ReviewQualityComponent implements OnInit {
  marks: any;
  private filtedMarks: any[];
  private questionName: any;


  // for chart
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    },
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  // chart end

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getMarks().then((data: any) => {
      this.marks = data;
    })
  }

  selectResult(result) {
    this.filtedMarks = result.marks;
    this.questionName = result.selectedQuestion;
    this.drawCharts()
  }

  private drawCharts() {
    let scores = [];
    let barChartData = [];
    for (const mark of this.filtedMarks) {
      for (const question of mark.summary) {
        if (question.questionName != this.questionName) continue;
        scores = scores.concat(_.map(question.details, 'score'))
      }
    }
    this.barChartLabels = scores = _.keys(_.groupBy(scores)).sort();
    // this.barChartData.length = 0;
    for (const mark of this.filtedMarks) {
      for (const question of mark.summary) {
        // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        if (question.questionName !== this.questionName) { continue; }
        let cnt;
        let data = [];
        cnt = _.groupBy(question.details, 'score');
        for (const score of scores) {
          if (_.has(cnt, score)) {
            data.push(cnt[score].length)
          } else {
            data.push(0)
          }
        }
        barChartData.push({data: data, label: mark.teacherName});
        break
      }
    }
    setTimeout(() => {
      this.barChartData = barChartData;
    }, 500);
    console.log('data: ', this.barChartData)
  }
}
