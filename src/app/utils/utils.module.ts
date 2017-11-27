import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {TeacherSelectorComponent} from './teacher-selector/teacher-selector.component';
import {FormsModule} from '@angular/forms';
import {TreeviewModule} from 'ngx-treeview';
import { ExamsFilterComponent } from './exams-filter/exams-filter.component';
import {ExamService} from '../exam/exam.service';
// dependency of ngx-treeview
// import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TreeviewModule.forRoot(),
    FormsModule
  ],
  exports: [TeacherSelectorComponent, ExamsFilterComponent],
  declarations: [TeacherSelectorComponent, ExamsFilterComponent],
  providers: [ExamService]
})
export class UtilsModule { }
