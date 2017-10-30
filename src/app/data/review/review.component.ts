import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    const defaultData = [{
      text: '阅卷进度统计',
      href: '#data/review/reviewStatistic',
      tags: ['1'],
      nodes: [{
        text: '进度明细',
        href: '#data/review/scheduleDetails',
        tags: ['0']
      }]
    }, {
      text: '阅卷质量',
      href: '#data/review/reviewQuality',
      tags: ['0']
    }, {
      text: '阅卷检索',
      href: '#data/review/reviewSearch',
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
