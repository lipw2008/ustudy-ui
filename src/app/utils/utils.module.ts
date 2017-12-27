import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TeacherSelectorComponent } from './teacher-selector/teacher-selector.component';
import { FormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import { ExamsFilterComponent } from './exams-filter/exams-filter.component';
import { ExamService } from '../exam/exam.service';
import { MarkSelectComponent } from './mark-select/mark-select.component';
import { SubjectFilterPipe } from '../data/review-statistic/subject-filter.pipe';
import { ReviewFilterComponent } from './review-filter/review-filter.component';
import { AnswerFilterComponent } from './answer-filter/answer-filter.component';
import { IntToDatePipe } from './int-to-date.pipe';
import { AddExamineeBatchComponent } from './modals/add-examinee-batch/add-examinee-batch.component';
// dependency of ngx-treeview
// import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    TreeviewModule.forRoot(),
  ],
  declarations: [
    TeacherSelectorComponent,
    ExamsFilterComponent,
    MarkSelectComponent,
    SubjectFilterPipe,
    ReviewFilterComponent,
    AnswerFilterComponent,
    IntToDatePipe,
    AddExamineeBatchComponent,
  ],
  providers: [ExamService],
  exports: [
    TeacherSelectorComponent,
    ExamsFilterComponent,
    MarkSelectComponent,
    ReviewFilterComponent,
    AnswerFilterComponent,
    SubjectFilterPipe,
    IntToDatePipe,
    AddExamineeBatchComponent,
  ]
})
export class UtilsModule { }
