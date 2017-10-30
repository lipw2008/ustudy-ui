import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-assign',
  templateUrl: './task-assign.component.html',
  styleUrls: ['./task-assign.component.css']
})
export class TaskAssignComponent implements OnInit {
  examId: string;
  gradeId: string;
  subjectId: string;
  seted: boolean;
  school: any;
  questions: any;
  assignType = '平均';
  markType = '单评';

  constructor(private _taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.examId = this.route.snapshot.params.examId;
    this.gradeId = this.route.snapshot.params.gradeId;
    this.subjectId = this.route.snapshot.params.subjectId;
    this.seted = this.route.snapshot.params.seted;
    const schoolId = 1;
    this._taskService.getSchool(schoolId).then((data) => {
      this.school = data
    });
    this._taskService.getQuestions(schoolId).then((data) => {
      this.questions = data
    })
  }

  setSelectedQuestion($event: Event) {
  }
}
