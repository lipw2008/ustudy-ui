import { Component, OnInit } from '@angular/core';
import { DownlineTreeviewItem, TreeviewConfig, TreeviewItem } from 'ngx-treeview';

declare var jQuery: any;

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
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

  constructor() {

  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {

  }

  ngOnInit() {
    const defaultData = [{
      text: '阅卷进度统计',
      href: '#data/reviewStatistic',
      tags: ['1'],
      nodes: [{
        text: '进度明细',
        href: '#data/scheduleDetails',
        tags: ['0']
      }]
    }, {
      text: '阅卷质量',
      href: '#data/reviewQuality',
      tags: ['0']
    }, {
      text: '阅卷检索',
      href: 'markingRetrieval.html',
      tags: ['0']
    }];

    jQuery('#sidebar').treeview({
      levels: 2,
      enableLinks: true,
      showBorder: false,
      expandIcon: 'glyphicon glyphicon-menu-right',
      collapseIcon: 'glyphicon glyphicon-menu-down',
      color: '#333',
      backColor: 'transparent',
      data: defaultData
    });
  }

}
