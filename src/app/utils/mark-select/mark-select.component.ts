import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {StudentService} from '../../info/students/student.service';
import * as _ from 'lodash';

@Component({
  selector: 'mark-select',
  templateUrl: './mark-select.component.html',
  styleUrls: ['./mark-select.component.css']
})
export class MarkSelectComponent implements OnChanges {
  @Input() marks: any;
  @Input() showQuestions = false;
  @Output() selectResult = new EventEmitter();
  schools: any = [{
    'departments': []
  }];
  selectedSchool: any;
  grades: any;
  subjects: any;
  exams: any;
  selectedExam: any;
  selectedGrade: any;
  selectedSubject: any;
  selectedQuestion: any;
  questions: any;


  constructor(private _studentService: StudentService) { }

  ngOnChanges(changes) {
    if (_.get(changes, 'marks.currentValue')) {
      this.reload();
    }
  }

  returnResult() {
    let res;
    res = this.filterQuestion();
    this.selectResult.emit({marks: res, selectedQuestion: this.selectedQuestion, examName: this.selectedExam,
      selectedSchool: this.selectedSchool, selectedGrade: this.selectedGrade, selectedSubject: this.selectedSubject})
  }

  filterQuestion() {
    return _.filter(this.marks, {schoolName: this.selectedSchool, examName: this.selectedExam, grade: this.selectedGrade,
      subject: this.selectedSubject });
  }

  getQuestions() {
    let res;
    if (!this.showQuestions) { return; }
    res = this.filterQuestion();
    res = _.reduce(_.map(res, 'summary'), (r, i) => {
        return r.concat(i);
    }, []);
    this.questions = _.keys(_.groupBy(_.map(res, 'questionName')));
    this.selectedQuestion = _.first(this.questions);
    return []
  }

  reload() {
    console.log('marks ', this.marks);
    this.schools = _.keys(_.groupBy( _.map(this.marks, 'schoolName')));
    this.selectedSchool = _.first(this.schools);
    this.grades = _.keys(_.groupBy( _.map(this.marks, 'grade')));
    this.selectedGrade = _.first(this.grades);
    this.subjects = _.keys(_.groupBy( _.map(this.marks, 'subject')));
    this.selectedSubject = _.first(this.subjects);
    this.exams = _.keys(_.groupBy( _.map(this.marks, 'examName')));
    this.selectedExam = _.first(this.exams);
    this.getQuestions();
  }

}
