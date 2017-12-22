import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
declare var jQuery: any;

@Injectable()
export class DataService {

  constructor(private _sharedService: SharedService) { }

  getAnswers() {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', 'assets/api/exams/quesanswerlist.json', '').then((data: any) => {
        resolve(data)
      })
    })
  }

  getMarks() {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', 'assets/api/exams/marklist.json', '').then((data: any) => {
        for (const mark of data) {
          for (const question of mark.summary) {
            question.teacherName = mark.teacherName;
            question.mark = mark
          }
        }
        resolve(data)
      })
    })
  }

  initSideBar() {
    const defaultData = [
      {
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
      },
      {
        text: '成绩统计',
        href: 'javascript:;',
        tags: ['1'],
        nodes: [{
          text: '考生成绩统计',
          href: 'javascript:;',
          tags: ['1'],
          state: {
            expanded: true
          },
          nodes: [{
            text: '考生成绩',
            href: '#data/result/examinees',
            tags: ['0']
          }]
        }]
      }
    ];

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

  getStudentResultList(examId, params: {}) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/score/students/subjects/${examId}`, params).then((data: any) => {
        if (data.success) {
          resolve(data.data)
        } else {
          reject()
        }
      })
    })
  }
}
