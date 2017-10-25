import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login.component';

/* Feature Modules */
import { WelcomeModule } from './welcome/welcome.module';

import { StudentModule } from './info/students/student.module';
import { TeacherModule } from './info/teachers/teacher.module';
import { SchoolModule } from './info/schools/school.module';
import { ExamModule } from './info/exams/exam.module';

import { MarkModule } from './exam/mark/mark.module';

import { SharedService } from './shared.service';
import { DataComponent } from './data/data.component';
import { ReviewStatisticComponent } from './data/review-statistic/review-statistic.component';
// dependency of ngx-treeview
// import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  imports: [
    BrowserModule,
    // Angular2FontawesomeModule,
    NgxDatatableModule,
    HttpModule,
    TreeviewModule.forRoot(),
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'data', component: DataComponent, children: [{
          path: 'reviewStatistic', component: ReviewStatisticComponent
        }]
      }
    ]),
    StudentModule,
    TeacherModule,
    SchoolModule,
    WelcomeModule,
    ExamModule,
    MarkModule
  ],
  declarations: [
    AppComponent,
    DataComponent,
    ReviewStatisticComponent
  ],
  providers: [
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
