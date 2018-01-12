import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TeacherSelectorComponent } from './teacher-selector/teacher-selector.component';
import { FormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import { ExamsFilterComponent } from './exams-filter/exams-filter.component';
import { ExamService } from '../exam/exam.service';
import { TeacherService } from '../info/teachers/teacher.service';
import { MarkSelectComponent } from './mark-select/mark-select.component';
import { MarkFilterComponent } from './mark-filter/mark-filter.component';
import { AnswerFilterComponent } from './answer-filter/answer-filter.component';
import { IntToDatePipe } from './int-to-date.pipe';
import { AddExamineeBatchComponent } from './modals/add-examinee-batch/add-examinee-batch.component';
import { AddTeacherBatchComponent } from './modals/add-teacher-batch/add-teacher-batch.component';
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
    MarkFilterComponent,
    AnswerFilterComponent,
    IntToDatePipe,
    AddExamineeBatchComponent,
    AddTeacherBatchComponent
  ],
  providers: [ExamService, TeacherService],
  exports: [
    TeacherSelectorComponent,
    ExamsFilterComponent,
    MarkSelectComponent,
    MarkFilterComponent,
    AnswerFilterComponent,
    IntToDatePipe,
    AddExamineeBatchComponent,
    AddTeacherBatchComponent
  ]
})
export class UtilsModule { }
