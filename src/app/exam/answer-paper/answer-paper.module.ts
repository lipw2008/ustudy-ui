import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerPaperListComponent } from './answer-paper-list/answer-paper-list.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../../utils/utils.module';
import { AnswerComponent } from './answer/answer.component';
import { FormsModule } from '@angular/forms';
import { AnswerService } from './answer.service';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'answerPapers', component: AnswerPaperListComponent },
      { path: 'answers', component: AnswerComponent },
    ]),
  ],
  declarations: [AnswerPaperListComponent, AnswerComponent],
  providers: [AnswerService]
})
export class AnswerPaperModule { }
