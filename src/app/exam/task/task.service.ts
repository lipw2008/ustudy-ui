import { Injectable } from '@angular/core';
import { SharedService } from "../../shared.service";

@Injectable()
export class TaskService {

  constructor(private _sharedService: SharedService) { }

  getExams() {
    return new Promise((resolve, reject) => {
      // XXX: should use /getExams/{examStatus}
      this._sharedService.makeRequest('GET', '/exam/getAllExams', '').then((data: any) => {
        if (!data.data) {
          reject('no data');
        }
        resolve(data.data)
      })
    })
  }

  getQuestions(examId) {
    return new Promise((resolve, reject) => {
      // XXX: should use exam/{examId}/questions
      this._sharedService.makeRequest('GET', 'assets/api/exams/questions.json', '').then((data: any) => {
        // if (!data.data) {
        //   reject('no data');
        // }
        // resolve(data.data)
        resolve(data)
      })
    })
  }

  getSchool(schoolId: number) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', 'assets/api/schools/school.json', '').then((data: any) => {
        resolve(data.data)
      })
    })
  }

  getGrade(gradeId:any) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', 'assets/api/schools/grade.json', '').then((data: any) => {
        // resolve(data.data)
        resolve(data)
      })
    })
  }
}
