import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherSelectorComponent} from './teacher-selector/teacher-selector.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [TeacherSelectorComponent],
  declarations: [TeacherSelectorComponent]
})
export class UtilsModule { }
