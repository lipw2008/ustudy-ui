import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { StudentListComponent }  from './students/student-list.component';
import { TeacherListComponent }  from './teachers/teacher-list.component';
import { SchoolComponent }  from './schools/school.component';

/* Feature Modules */
import { StudentModule } from './students/student.module';
import { TeacherModule } from './teachers/teacher.module';
import { SchoolModule } from './schools/school.module';

@NgModule({
  imports: [
    BrowserModule,
	  NgxDatatableModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'student', component: StudentListComponent },
      { path: 'teacher', component: TeacherListComponent },
      { path: 'school', component: SchoolComponent },
      { path: '', redirectTo: 'student', pathMatch: 'full' }
    ]),
	StudentModule,
  TeacherModule,
  SchoolModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

