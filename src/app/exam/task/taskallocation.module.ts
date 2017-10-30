import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SetObjectivesNoComponent } from './setobjectivesno.component';
import { TaskAllocationComponent } from './taskallocation.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild([
      { path: 'setobjectivesno', component: SetObjectivesNoComponent },
      { path: 'taskallocation', component: TaskAllocationComponent }
    ]),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    SetObjectivesNoComponent,
    TaskAllocationComponent
  ],
  providers: []
})
export class TaskAllocationModule { }
