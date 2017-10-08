import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { StudentListComponent } from './student-list.component';
import { AddStudentComponent } from './add-student.component';
import { UpdateStudentComponent } from './update-student.component';

import { StudentService } from './student.service';

@NgModule({
  imports: [
    CommonModule,
	NgxDatatableModule,
    RouterModule.forChild([
      { path: 'studentList', component: StudentListComponent },
	  { path: 'addStudent', component: AddStudentComponent },
	  { path: 'updateStudent', component: UpdateStudentComponent }
    ]),
	ReactiveFormsModule,
  FormsModule,
	HttpModule
  ],
  declarations: [
    StudentListComponent,
	AddStudentComponent,
	UpdateStudentComponent
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule {}
