import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataComponent } from './data.component';
import { ReviewComponent } from './review/review.component';
import { ReviewStatisticComponent } from './review-statistic/review-statistic.component';
import { ReviewQualityComponent } from './review-quality/review-quality.component';
import { ReviewSearchComponent } from './review-search/review-search.component';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';
import { QuestionsAnalysisComponent } from './questions-analysis/questions-analysis.component';
import {FormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { UtilsModule } from '../utils/utils.module';
import { TreeviewModule } from 'ngx-treeview';
import { ChartsModule } from 'ng2-charts';
import { DataService } from './data.service';
import {ResultStatisticsComponent} from './result-statistics/result-statistics.component';
import {ExamineeResultComponent} from './result-statistics/examinee-result/examinee-result.component';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    UtilsModule,
    TreeviewModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    RouterModule.forChild([
      {
        path: 'data', component: DataComponent, children: [
          {
            path: 'review', component: ReviewComponent, children: [
              { path: 'reviewStatistic', component: ReviewStatisticComponent },
              { path: 'reviewQuality', component: ReviewQualityComponent },
              { path: 'reviewSearch', component: ReviewSearchComponent },
              { path: 'scheduleDetails', component: ScheduleDetailsComponent }
            ]
          },
          { path: 'questionsAnalysis', component: QuestionsAnalysisComponent },
          {
            path: 'result', component: ResultStatisticsComponent, children: [
              { path: 'examinees', component: ExamineeResultComponent },
            ]
          },
        ]
      }
    ]),
    ChartsModule,
  ],
  declarations: [
    DataComponent,
    ReviewComponent,
    ReviewStatisticComponent,
    ReviewQualityComponent,
    ReviewSearchComponent,
    ScheduleDetailsComponent,
    QuestionsAnalysisComponent,
    ResultStatisticsComponent,
    ExamineeResultComponent
  ],
  providers: [
    DataService,
  ]
})
export class DataModule { }
