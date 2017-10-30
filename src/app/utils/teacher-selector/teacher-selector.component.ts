import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'teacher-selector',
  templateUrl: './teacher-selector.component.html',
  styleUrls: ['./teacher-selector.component.css']
})
export class TeacherSelectorComponent implements OnInit {
  @Input() grade: any;
  selectedGroup: any;
  teachers: any;
  selectedTeachers: any;

  constructor() { }

  ngOnInit() {
  }

  refreshTeachers() {
    this.teachers = this.grade.teachers.filter((v, i) => {
      return v.group === this.selectedGroup.id
    })
  }
}
