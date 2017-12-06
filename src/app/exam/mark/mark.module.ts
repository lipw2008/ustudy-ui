import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {MarkService} from 'app/exam/mark/mark.service';

import { MarkComponent } from './mark.component';
import { MarkListComponent } from './mark-list.component';
import { CanvasComponent } from './canvas.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild([
      { path: 'mark', component: MarkComponent },
      { path: 'markList', component: MarkListComponent }
    ]),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    MarkComponent,
    MarkListComponent,
    CanvasComponent
  ],
  providers: [MarkService]
})
export class MarkModule { }
