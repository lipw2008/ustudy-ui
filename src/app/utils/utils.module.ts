import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherSelectorComponent} from './teacher-selector/teacher-selector.component';
import {FormsModule} from '@angular/forms';
import {TreeviewModule} from 'ngx-treeview';
// dependency of ngx-treeview
// import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    TreeviewModule.forRoot(),
    FormsModule
  ],
  exports: [TeacherSelectorComponent],
  declarations: [TeacherSelectorComponent]
})
export class UtilsModule { }
