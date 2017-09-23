import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { TaskAllocationComponent } from './taskallocation.component';

@NgModule({
  imports: [
    CommonModule,
  	NgxDatatableModule,
    RouterModule.forChild([
      { path: 'taskallocation', component: TaskAllocationComponent }
    ]),
	ReactiveFormsModule,
  FormsModule,
	HttpModule
  ],
  declarations: [
    TaskAllocationComponent
  ],
  providers: []
})
export class TaskAllocationModule {}
