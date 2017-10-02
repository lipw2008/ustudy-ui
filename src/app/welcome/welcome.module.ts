import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { WelcomeComponent } from './welcome.component';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent }
    ]),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    WelcomeComponent,
    LoginComponent
  ],
  providers: []  
})
export class WelcomeModule {}
