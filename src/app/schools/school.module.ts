import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { SchoolComponent } from './school.component';
import { SubjectOwnerComponent } from './subject-owner.component';

import { SchoolService } from './school.service';

@NgModule({
  imports: [
    CommonModule,
	NgxDatatableModule,
    RouterModule.forChild([
      { path: 'school', component: SchoolComponent },
      { path: 'subjectOwner', component: SubjectOwnerComponent }
    ]),
	ReactiveFormsModule,
  FormsModule,
	HttpModule
  ],
  declarations: [
    SchoolComponent,
    SubjectOwnerComponent
  ],
  providers: [
    SchoolService
  ]
})
export class SchoolModule {}
