import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { StudentListComponent }  from './students/student-list.component';

/* Feature Modules */
import { StudentModule } from './students/student.module';

@NgModule({
  imports: [
    BrowserModule,
	  NgxDatatableModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'student', component: StudentListComponent },
      { path: '', redirectTo: 'student', pathMatch: 'full' }
    ]),
	StudentModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
