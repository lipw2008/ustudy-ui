import { Component, OnInit } from '@angular/core';

import { SchoolService } from './school.service';
import { SharedService } from '../../shared.service';

@Component({
  templateUrl: 'school.component.html'
})

export class SchoolComponent implements OnInit {

  errorMessage: string;

  school: any = {
    "departments": []
  };

  types = ["初中", "完中", "九年制", "小学", "十二年制", "补习", "其他", "高中"];

  hasBranch = false;

  constructor(private _schoolService: SchoolService, private _sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    //req.open('GET', 'assets/api/schools/school.json');
    this._sharedService.makeRequest('GET', '/info/school/detail', '').then((data: any) => {
      //cache the list
      console.log("data: " + JSON.stringify(data));
      this.school = data;

      for (let department of data.departments) {
        for (let grade of department.grades) {
          if (grade.gradeType === true) {
            this.hasBranch = true;
            break;
          }
        }
        if (this.hasBranch === true) break;
      }

    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }
}
