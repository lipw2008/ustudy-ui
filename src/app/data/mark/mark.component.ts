import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-markdata',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkDataComponent implements OnInit {
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.initSideBar('mark')
  }
}
