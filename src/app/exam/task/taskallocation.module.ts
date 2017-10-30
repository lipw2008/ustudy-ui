import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SetObjectivesNoComponent } from './setobjectivesno.component';
import { TaskAllocationComponent } from './taskallocation.component';
import { TaskAssignComponent } from './task-assign/task-assign.component';
import {TaskService} from 'app/exam/task/task.service';
import {UtilsModule} from '../../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild([
      { path: 'setobjectivesno', component: SetObjectivesNoComponent },
      { path: 'taskassign', component: TaskAssignComponent },
      { path: 'taskallocation', component: TaskAllocationComponent }
    ]),
    ReactiveFormsModule,
    FormsModule,
    UtilsModule,
    HttpModule
  ],
  declarations: [
    SetObjectivesNoComponent,
    TaskAllocationComponent,
    TaskAssignComponent
  ],
  providers: [TaskService]
})
export class TaskAllocationModule { }
