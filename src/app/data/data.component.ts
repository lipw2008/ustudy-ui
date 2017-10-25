import { Component, OnInit } from '@angular/core';
import { DownlineTreeviewItem, TreeviewConfig, TreeviewItem } from 'ngx-treeview';

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
    const defaultData = [{
      text: '阅卷进度统计',
      href: 'markingProgress.html',
      tags: ['1'],
      nodes: [{
        text: '进度明细',
        href: 'scheduleDetails.html',
        tags: ['0']
      }
      ]
    },
    {
      text: '阅卷质量',
      href: 'markingQuality.html',
      tags: ['0']
    },
    {
      text: '阅卷检索',
      href: 'markingRetrieval.html',
      tags: ['0']
    }
    ];
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {

  }

  ngOnInit() {
  }

}
