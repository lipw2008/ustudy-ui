import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { TeacherListComponent } from './teacher-list.component';
import { AddTeacherComponent } from './add-teacher.component';
import { UpdateTeacherComponent } from './update-teacher.component';

import { TeacherService } from './teacher.service';

@NgModule({
  imports: [
    CommonModule,
	 NgxDatatableModule,
    RouterModule.forChild([
      { path: 'teacherList', component: TeacherListComponent },
	  { path: 'addTeacher', component: AddTeacherComponent },
	  { path: 'updateTeacher', component: UpdateTeacherComponent }
    ]),
	ReactiveFormsModule,
  FormsModule,
	HttpModule
  ],
  declarations: [
    TeacherListComponent,
	AddTeacherComponent,
	UpdateTeacherComponent
  ],
  providers: [
    TeacherService
  ]
})
export class TeacherModule {}
