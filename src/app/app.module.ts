import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Feature Modules */
import { WelcomeModule } from './welcome/welcome.module';

import { SetAnswersModule } from './exam/setanswers/setanswers.module';
import { TaskAllocationModule } from './exam/task/taskallocation.module';
import { StudentModule } from './info/students/student.module';
import { TeacherModule } from './info/teachers/teacher.module';
import { SchoolModule } from './info/schools/school.module';
import { ExamModule } from './info/exams/exam.module';

import { MarkModule } from './exam/mark/mark.module';

import { SharedService } from './shared.service';
import {AnswerPaperModule} from './exam/answer-paper/answer-paper.module';

@NgModule({
  imports: [
    BrowserModule,
    // Angular2FontawesomeModule,
    NgxDatatableModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    StudentModule,
    TeacherModule,
    SchoolModule,
    WelcomeModule,
    TaskAllocationModule,
    SetAnswersModule,
    AnswerPaperModule,
    ExamModule,
    MarkModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    SharedService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
