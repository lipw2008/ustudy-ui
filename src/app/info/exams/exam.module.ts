import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ExamListComponent } from './exam-list.component';
import { UtilsModule } from '../../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    UtilsModule,
    RouterModule.forChild([
      { path: 'examList', component: ExamListComponent }
    ]),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    ExamListComponent,
  ],
  providers: []
})
export class ExamModule { }
