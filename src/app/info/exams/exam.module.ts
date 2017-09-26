import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { ExamListComponent } from './exam-list.component';

@NgModule({
  imports: [
    CommonModule,
  	NgxDatatableModule,
    RouterModule.forChild([
      { path: 'examList', component: ExamListComponent }
    ]),
	ReactiveFormsModule,
  FormsModule,
	HttpModule
  ],
  declarations: [
    ExamListComponent
  ],
  providers: []
})
export class ExamModule {}
