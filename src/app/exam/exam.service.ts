import { Injectable } from '@angular/core';
import {SharedService} from '../shared.service';

@Injectable()
export class ExamService {
  private examOptions: Promise<any>;

  constructor(private _sharedService: SharedService) {
    this.examOptions = new Promise((resolve, reject) => {
      this._sharedService.makeRequest('GET', `/exam/options`, '').then((data: any) => {
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

}
