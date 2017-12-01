import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

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

}
