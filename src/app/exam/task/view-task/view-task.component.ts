import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../task.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  examId: string;
  gradeId: string;
  subjectId: string;
  seted: boolean;

  markTasks: any;
  gradesubjects: any;
  grades: any[];
  selectedGrade: any;
  subjects: any;
  exam: any;
  selectedSubject: any;
  questions: any;
  tasks: any[];

  constructor(private _taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.examId = this.route.snapshot.params.examId;
    this.gradeId = this.route.snapshot.params.gradeId;
    this.subjectId = this.route.snapshot.params.subjectId;
    this.seted = this.route.snapshot.params.seted;
    this.exam = this.route.snapshot.params.exam;
    this._taskService.getMarkTasks(this.examId).then((data) => {
      this.markTasks = data;
      this._taskService.getExamSubjects(this.examId).then((data) => {
        this.gradesubjects = data;
      })
    });
    this._taskService.getQuestions(this.examId, null, this.gradeId, this.subjectId).then((data) => {
      this.questions = data
    })
  }

  setFiltetedTasks() {
    this.tasks = _.filter(this.markTasks, {gradeId: this.selectedGrade.id, subjectId: this.selectedSubject.id})
  }

  getQuestionName(task: any) {
    return _.find(this.questions, {id: task.questionId}).questionName
  }
}
