import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IStudent } from './student';

@Injectable()
export class StudentService {
  private _studentUrl = 'api/students/students.json';

  private grades = ['七年级', '八年级', '九年级', '高一', '高二', '高三'];

  private classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  private types = ['普通', '体育', '艺术'];

  constructor(private _http: Http) { }

  getStudents(): Observable<IStudent[]> {
    return this._http.get(this._studentUrl)
      .map((response: Response) => <IStudent[]>response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getStudent(id: string): Observable<IStudent> {
    return this.getStudents()
      .map((students: IStudent[]) => students.find(p => p.studentId === id));
  }

  getGrades(): string[] {
    return this.grades;
  }

  getClasses(): string[] {
    return this.classes;
  }

  getTypes(): string[] {
    return this.types;
  }

  getDefaultStudent(): IStudent {
    return {
      'studentId': '',
      'studentName': '',
      'grade': '',
      'class': '',
      'type': '',
      'isTemp': false
    }
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
