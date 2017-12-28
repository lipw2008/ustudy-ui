import { Injectable } from '@angular/core';
import { SharedService } from '../../shared.service';
import * as _ from 'lodash';

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

  getTeachers() {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/api/task/allocation/school/teachers`, '').then((data: any) => {
        if (data.success) {
          resolve(data.data)
        } else {
          reject(data.success)
        }
      })
    })
  }

  toggleGrade(gradeTeachers, event) {
    let selectedAll = false;
    if (event === null || _.every(gradeTeachers, {gradeChecked: false})) {
      selectedAll = true
    }
    let subjectTeachers;
    subjectTeachers = [];
    gradeTeachers.forEach((grade) => {
      if (selectedAll || grade.gradeChecked) {
        grade.subjects.forEach((subject) => {
          const s = _.find(subjectTeachers, {subName: subject.subName});
          if (!s) {
            subjectTeachers.push(subject);
            return
          }
          subject.teachers.forEach((teacher) => {
            if (!_.some(s.teachers, {teacId: teacher.teacId})) {
              s.teachers.push(teacher)
            }
          })
        })
      }
    });
    subjectTeachers.forEach((subject) => {
      subject.teachers.forEach( (teacher) => {
        if (!_.has(teacher, 'groups')) {
          teacher.groups = []
        }
        if (!_.includes(teacher.groups, subject.subName)) {
          teacher.groups.push(subject.subName)
        }
      })
    });
    console.log('subjectTeachers: ', subjectTeachers);
    return subjectTeachers;
  }

  subjectTeachersToTeachers(subjectTeachers) {
    return _.reduce(subjectTeachers, (res, subject) => {
      return res.concat(subject.teachers)
    }, [])
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

  getNoWorkingTeachers(gradeId) {
    return new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET',
        `/api/task/allocation/grade/notask/teachers/${gradeId}`, '').then((data: any) => {
        if (data.success) {
          resolve(data.data)
        } else {
          reject(data.success)
        }
      })
    })
  }
}
