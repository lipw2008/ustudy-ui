import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerPaperListComponent } from './answer-paper-list/answer-paper-list.component';
import { RouterModule } from '@angular/router';
import {UtilsModule} from "../../utils/utils.module";

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule.forChild([
      { path: 'answerPapers', component: AnswerPaperListComponent },
    ]),
  ],
  declarations: [AnswerPaperListComponent]
})
export class AnswerPaperModule { }
