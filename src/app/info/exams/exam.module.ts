import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';

import { ExamListComponent } from './exam-list.component';
import { UtilsModule } from '../../utils/utils.module';
import { NewExamComponent } from './new-exam/new-exam.component';
import { UnfinishedExamDetailsComponent } from './unfinished-exam-details/unfinished-exam-details.component';
import { ExamineeComponent } from './examinee/examinee.component';
import {AddExamineeBatchComponent} from '../../utils/modals/add-examinee-batch/add-examinee-batch.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    UtilsModule,
    RouterModule.forChild([
      { path: 'examList', component: ExamListComponent },
      { path: 'examDetails', component: UnfinishedExamDetailsComponent },
      { path: 'examinee', component: ExamineeComponent },
      { path: 'addExam', component: NewExamComponent }
    ]),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  entryComponents: [
    AddExamineeBatchComponent,
  ],
  declarations: [
    ExamListComponent,
    NewExamComponent,
    UnfinishedExamDetailsComponent,
    ExamineeComponent,
  ],
  providers: []
})
export class ExamModule { }
