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

  filterExams(params) {
    return new Promise((resolve, reject) => {
      // XXX: should use /exams/{examStatus}
      this._sharedService.makeRequest('GET', '/api/exams', params).then((data: any) => {
        if (!data.data) {
          reject('no data');
        }
        resolve(data.data)
      })
    })
  }

  getExamOptions() {
    return this.examOptions
  }

  createExam(params) {
    console.log('createExam: ', params);
    return new Promise((resolve, reject) => {
      // resolve()
      this._sharedService.makeRequest('POST', `/api/info/exam/create/`, params).then((data: any) => {
        if (data.success) {
          resolve(data.data)
        } else {
          reject()
        }
      })
    })
  }

  deleteExam(examId) {
    return new Promise((resolve, reject) => {
      // resolve()
      this._sharedService.makeRequest('POST', `/api/info/exam/delete/${examId}`, '').then((data: any) => {
        if (data.success) {
          resolve(data.data)
        } else {
          reject()
        }
      })
    })
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

  getExamDetails(examId) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/exam/summary/${examId}`, '').then((data: any) => {
        if (data.success) {
          resolve(data.data)
        } else {
          reject()
        }
      })
    })
  }

  getExam(examId) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/exam/${examId}`, '').then((data: any) => {
        if (data.success) {
          resolve(data.data)
        } else {
          reject()
        }
      })
    })
  }
}
