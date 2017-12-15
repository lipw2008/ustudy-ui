import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ExamListComponent } from './exam-list.component';
import { UtilsModule } from '../../utils/utils.module';
import { NewExamComponent } from './new-exam/new-exam.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    UtilsModule,
    RouterModule.forChild([
      { path: 'examList', component: ExamListComponent },
      { path: 'addExam', component: NewExamComponent }
    ]),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    ExamListComponent,
    NewExamComponent,
  ],
  providers: []
})
export class ExamModule { }
