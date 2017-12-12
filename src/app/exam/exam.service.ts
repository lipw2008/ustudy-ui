import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import * as _ from 'lodash';

@Injectable()
export class ExamService {
  private examOptions: Promise<any>;

  constructor(private _sharedService: SharedService) {
    this.examOptions = new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/exam/options`, '').then((data: any) => {
        if (data.success) {
          resolve(data.data)
        } else {
          reject(data.success)
        }
      })
    })
  }

  getExamOptions() {
    return this.examOptions
  }

  filterExamSubjects(conditions): any {
    const urlParams = _.map(conditions, (v, k) => `${k}=${v}`).join('&');
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/examsubjects?${urlParams}`, '').then((data: any) => {
        if (data.success) {
          resolve(data.data)
        }
      })
    })
  }

  getLastExamSubjects() {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/last/examsubjects`, '').then((data: any) => {
        if (data.success) {
          resolve(data.data)
        } else {
          reject()
        }
      })
    })
  }
}
