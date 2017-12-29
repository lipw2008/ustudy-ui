import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import {ProblemService} from 'app/exam/problem/problem.service';

import { ProblemComponent } from './problem.component';
import { ProblemListComponent } from './problem-list.component';
import { ExpaperComponent } from './expaper.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild([
      { path: 'problem', component: ProblemComponent },
      { path: 'problemList', component: ProblemListComponent }
    ]),
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ProblemComponent,
    ProblemListComponent,
    ExpaperComponent
  ],
  providers: [ProblemService]
})
export class ProblemModule { }
