import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { SelectSubjectComponent } from './selectsubject.component';

@NgModule({
  imports: [
    CommonModule,
  	NgxDatatableModule,
    RouterModule.forChild([
      { path: 'selectsubject', component: SelectSubjectComponent }
    ]),
	ReactiveFormsModule,
  FormsModule,
	HttpModule
  ],
  declarations: [
    SelectSubjectComponent
  ],
  providers: []
})
export class SelectSubjectModule {}
