import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared.service";
import {StudentService} from "../../info/students/student.service";

@Component({
  selector: 'app-review-statistic',
  templateUrl: './review-statistic.component.html',
  styleUrls: ['./review-statistic.component.css']
})
export class ReviewStatisticComponent implements OnInit {
  schools: any = [{
    'departments': []
  }];

  constructor(private _sharedService: SharedService, private _studentService: StudentService) { }

  ngOnInit(): void {
    this.reload();
  }

  getGrades(school) {
    this._studentService.getGrades();
  }

  reload() {
    // req.open('GET', 'assets/api/schools/grade.json');
    this._sharedService.makeRequest('GET', '/info/school/detail', '').then((data: any) => {
      console.log('data: ' + JSON.stringify(data));
      this.schools = [data];
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

}
