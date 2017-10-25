import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { SchoolComponent } from './school.component';
import { DepartmentComponent } from './department.component';
import { UpdateDepartmentComponent } from './update-department.component';
import { GradeComponent } from './grade.component';
import { UpdateGradeComponent } from './update-grade.component';
import { ClassComponent } from './class.component';
import { UpdateClassComponent } from './update-class.component';
import { AddClassTeacherComponent } from './add-class-teacher.component';

import { SchoolService } from './school.service';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild([
      { path: 'schoolDetails', component: SchoolComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'updateDepartment', component: UpdateDepartmentComponent },
      { path: 'grade', component: GradeComponent },
      { path: 'updateGrade', component: UpdateGradeComponent },
      { path: 'class', component: ClassComponent },
      { path: 'updateClass', component: UpdateClassComponent },
      { path: 'addClassTeacher', component: AddClassTeacherComponent }
    ]),
    ReactiveFormsModule,
  FormsModule,
    HttpModule
  ],
  declarations: [
    SchoolComponent,
    DepartmentComponent,
    UpdateDepartmentComponent,
    GradeComponent,
    UpdateGradeComponent,
    ClassComponent,
    UpdateClassComponent,
    AddClassTeacherComponent
  ],
  providers: [
    SchoolService
  ]
})
export class SchoolModule {}
