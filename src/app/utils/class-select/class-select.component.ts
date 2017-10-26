import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../shared.service';
import {StudentService} from '../../info/students/student.service';

@Component({
  selector: 'class-select',
  templateUrl: './class-select.component.html',
  styleUrls: ['./class-select.component.css']
})
export class ClassSelectComponent implements OnInit {
  @Output() selectResult = new EventEmitter();
  schools: any = [{
    'departments': []
  }];
  selectedSchool: '';


  constructor(private _sharedService: SharedService, private _studentService: StudentService) { }

  ngOnInit() {
    this.reload();
  }

  getGrades(school) {
    return this._studentService.getGrades();
  }

  getClasses(school, grade) {
    return this._studentService.getClasses();
  }

  reload() {
    // req.open('GET', 'assets/api/schools/grade.json');
    this._sharedService.makeRequest('GET', '/info/school/detail', '').then((data: any) => {
      console.log('data: ' + JSON.stringify(data));
      this.schools = [data];
      this.selectResult.emit( {schoolId: data.id})
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
    });
  }

}
