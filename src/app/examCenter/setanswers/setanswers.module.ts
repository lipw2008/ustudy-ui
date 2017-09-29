import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { SelectSubjectComponent } from './selectsubject.component';
import { SetAnswersComponent } from './setanswers.component';

@NgModule({
  imports: [
    CommonModule,
  	NgxDatatableModule,
    RouterModule.forChild([
      { path: 'selectsubject', component: SelectSubjectComponent },
      { path: 'setanswers', component: SetAnswersComponent }
    ]),
	ReactiveFormsModule,
  FormsModule,
	HttpModule
  ],
  declarations: [
    SelectSubjectComponent,
    SetAnswersComponent
  ],
  providers: []
})
export class SetAnswersModule {}
