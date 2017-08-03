import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { StudentListComponent }  from './students/student-list.component';
import { TeacherListComponent }  from './teachers/teacher-list.component';

/* Feature Modules */
import { StudentModule } from './students/student.module';
import { TeacherModule } from './teachers/teacher.module';

@NgModule({
  imports: [
    BrowserModule,
	  NgxDatatableModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'student', component: StudentListComponent },
      { path: 'teacher', component: TeacherListComponent },
      { path: '', redirectTo: 'student', pathMatch: 'full' }
    ]),
	StudentModule,
  TeacherModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
