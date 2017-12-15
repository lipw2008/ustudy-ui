import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'subjectFilter'
})
export class SubjectFilterPipe implements PipeTransform {

  transform(marks: any, selected?: any): any {
    const res = marks;
    // if (selected.selectedSchool) {
    //   res = _.filter(res, {schoolName: selected.selectedSchool})
    // }
    // if (selected.selectedGrade) {
    //   res = _.filter(res, {grade: selected.selectedGrade})
    // }
    // if (selected.selectedExam) {
    //   res = _.filter(res, {examName: selected.selectedExam})
    // }
    // if (selected.selectedSubject) {
    //   res = _.filter(res, {subject: selected.selectedSubject})
    // }
    return this.getSubjects(res, selected);
  }

  private getSubjects(marks: any, selected: any) {
    const grades = _.keys(_.groupBy(_.map(marks, 'grade')));
    const tmp = {};
    const subjects = [];
    _.forEach(marks, (mark) => {
      const k = mark.grade + mark.subject;
      const v = tmp[k];
      if (v) {
        v.push(mark);
      } else {
        tmp[k] = [mark]
      }
    });
    _.forEach(tmp, (v, k) => {
      subjects.push({ name: k, marks: v })
    });
    return subjects;
  }
}
