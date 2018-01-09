import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-result-statistics',
  templateUrl: './result-statistics.component.html',
  styleUrls: ['./result-statistics.component.css']
})
export class ResultStatisticsComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.initSideBar('result');
  }

}
