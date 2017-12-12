import { Injectable } from '@angular/core';
import { SharedService } from '../../shared.service';

@Injectable()
export class TaskService {

  constructor(private _sharedService: SharedService) { }

  getExam(examId) {
    return new Promise((resolve, reject) => {
      // XXX: should use /exams/{examStatus}
      this._sharedService.makeRequest('GET', 'api/exam/' + examId, '').then((data: any) => {
        if (!data.data) {
          reject('no data');
        }
        resolve(data.data)
      })
    })
  }

  getQuestions(examId, schoolId, gradeId, subjectId) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/task/allocation/questions/${examId}/${gradeId}/${subjectId}`,
        '').then((data: any) => {
          if (!data.data) {
            reject('no data');
          }
          resolve(data.data)
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

  getGrade(gradeId: any) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/task/allocation/grade/${gradeId}`, '').then((data: any) => {
        resolve(data.data)
      })
    })
  }

  deleteMarkTask(task) {
    return new Promise((resolve, reject) => {
      console.log('delete task:', task);
      this._sharedService.makeRequest('POST', `/exam/marktask/delete/`, JSON.stringify(task)).then((res) => {
        resolve(res)
      })
    })
  }

  updateMarkTask(json) {
    return new Promise((resolve, reject) => {
      console.log('update task:', JSON.stringify(json));
      this._sharedService.makeRequest('POST', '/exam/marktask/update/', JSON.stringify(json)).then((res) => {
        resolve(res)
      })
    })
  }

  createMarkTask(json) {
    console.log('create task:', JSON.stringify(json));
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('POST', '/exam/marktask/create/', JSON.stringify(json)).then((res) => {
        resolve(res)
      })
    })
  }

  getMarkTasks(examId, gradeId, subjectId) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/exam/marktasks/${examId}/${gradeId}/${subjectId}`,
        JSON.stringify({ examId: examId, gradeId: gradeId, subjectId: subjectId })).then((data: any) => {
          if (data.success) {
            resolve(data.data)
          } else {
            reject(data.success)
          }
        })
    })
  }

  getExamSubjects(examId): any {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', '/api/examsubjects/' + examId, '').then((data: any) => {
        if (data.success) {
          resolve(data.data)
        }
      })
    })
  }

  getTask(examId: string, gradeId: string, subjectId: string, questionId: string) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/exam/marktasks/${examId}/${gradeId}/${subjectId}/${questionId}`,
        '').then((data: any) => {
          if (data.success) {
            resolve(data.data)
          } else {
            reject(data.success)
          }
        })
    })
  }

  getWorkingTeachers() {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET',
        `assets/api/exams/markTask/workingTeachers.json`, '').then((data: any) => {
          // resolve(data.data)
          resolve(data)
        })
    })
  }
}
