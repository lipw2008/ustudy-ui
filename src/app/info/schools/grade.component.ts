import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SchoolService } from './school.service';
import { SharedService } from '../../shared.service';

@Component({
  templateUrl: 'grade.component.html'
})

export class GradeComponent implements OnInit {

  errorMessage: string;

  grade: any = {
    id: "",
    gradeOwner: { "id": "", "n": "" }
  };

  gradeId: string = "";

  constructor(private _schoolService: SchoolService, private _sharedService: SharedService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.gradeId = this.route.snapshot.params.gradeId;
    this.reload();
  }

  reload() {
    //req.open('GET', 'assets/api/schools/grade.json');
    this._sharedService.makeRequest('GET', '/info/school/grade/' + this.gradeId, '').then((data: any) => {
      //cache the list
      console.log("data: " + JSON.stringify(data));
      this.grade = data;
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

  stringify(j) {
    return JSON.stringify(j);
  }

}
