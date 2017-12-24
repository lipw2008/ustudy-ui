import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ITeacher } from './teacher';
import { SharedService } from '../../shared.service';

@Injectable()
export class TeacherService {
  private _teacherUrl = 'api/teachers/teachers.json';

  constructor(private _http: Http, private _sharedService: SharedService) { }

  getGsr(): any {
    var promise = new Promise((resolve, reject) => {
        //this._sharedService.makeRequest('GET', 'assets/api/teachers/properties.json', '').then((data: any) => {
        this._sharedService.makeRequest('GET', '/info/school/gsr/', '').then((data: any) => {
          //cache the list
          console.log("data: " + JSON.stringify(data));
          resolve(data.data);
        }).catch((error: any) => {
          console.log(error.status);
          console.log(error.statusText);
          reject();
        });
    });
    return promise;
  }

  getDefaultTeacher(): ITeacher {
    return {
      "teacherId": "",
      "teacherName": "",
      "grades": [{ "n": "" }],
      "subjects": [{ "n": "" }],
      "roles": [{ "n": "" }]
    }
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
