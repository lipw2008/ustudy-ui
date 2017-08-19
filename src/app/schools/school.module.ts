import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { SchoolComponent } from './school.component';
import { SubjectComponent } from './subject.component';
import { UpdateSubjectComponent } from './update-subject.component';

import { SchoolService } from './school.service';

@NgModule({
  imports: [
    CommonModule,
	NgxDatatableModule,
    RouterModule.forChild([
      { path: 'school', component: SchoolComponent },
      { path: 'subject', component: SubjectComponent },
      { path: 'updateSubject', component: UpdateSubjectComponent }
    ]),
	ReactiveFormsModule,
  FormsModule,
	HttpModule
  ],
  declarations: [
    SchoolComponent,
    SubjectComponent,
    UpdateSubjectComponent
  ],
  providers: [
    SchoolService
  ]
})
export class SchoolModule {}
