import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { WelcomeComponent }  from './welcome/welcome.component';

/* Feature Modules */
import { StudentModule } from './students/student.module';
import { TeacherModule } from './teachers/teacher.module';
import { SchoolModule } from './schools/school.module';
import { WelcomeModule } from './welcome/welcome.module';

import { MarkModule } from './examCenter/mark/mark.module';
import { SetAnswersModule } from './examCenter/setanswers/setanswers.module';

import { SharedService } from './shared.service';

@NgModule({
  imports: [
    BrowserModule,
	  NgxDatatableModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
	StudentModule,
  TeacherModule,
  SchoolModule,
  WelcomeModule,
  MarkModule,
  SetAnswersModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    SharedService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

