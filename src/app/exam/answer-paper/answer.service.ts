import { Injectable } from '@angular/core';
import { SharedService } from '../../shared.service';

@Injectable()
export class AnswerService {

  constructor(private _sharedService: SharedService) { }

  getEGS(examId, gradeId, subjectId) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/examsubject/${examId}/${gradeId}/${subjectId}`,
        '').then((data: any) => {
          if (!data.data) {
            reject('no data');
          }
          resolve(data.data)
        })
    })
  }

  getAnswerPapers(params: any) {
    console.log(`getAnswerPapers: `, JSON.stringify(params));
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/answers`, JSON.stringify(params)).then((data: any) => {
        if (!data.data) {
          reject('no data');
        }
        resolve(data.data)
      })
    })
  }
}
