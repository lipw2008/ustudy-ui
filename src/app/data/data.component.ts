import { Component, OnInit } from '@angular/core';
import {DownlineTreeviewItem, TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import {DataService} from "./data.service";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [DataService]
})
export class DataComponent implements OnInit {
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: true,
    maxHeight: 400
  });

  item = new TreeviewItem({
    text: 'Children', value: 1, collapsed: true, children: [
      { text: 'Baby 3-5', value: 11 },
      { text: 'Baby 6-8', value: 12 },
      { text: 'Baby 9-12', value: 13 }
    ]
  });

  items = [this.item];

  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {

  }

  constructor() {
  }

  ngOnInit() {
  }

}
