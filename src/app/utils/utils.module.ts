import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarkSelectComponent} from "./mark-select/mark-select.component";
import {FormsModule} from "@angular/forms";
import {SubjectFilterPipe} from "../data/review-statistic/subject-filter.pipe";
import {TreeviewModule} from "ngx-treeview";
import {ReviewFilterComponent} from "./review-filter/review-filter.component";
import {AnswerFilterComponent} from "./answer-filter/answer-filter.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeviewModule.forRoot(),
  ],
  declarations: [
    MarkSelectComponent,
    SubjectFilterPipe,
    ReviewFilterComponent,
    AnswerFilterComponent,
  ],
  exports: [
    MarkSelectComponent,
    SubjectFilterPipe,
    ReviewFilterComponent,
    AnswerFilterComponent,
  ]
})
export class UtilsModule { }
