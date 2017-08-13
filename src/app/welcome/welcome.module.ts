import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'welcome', component: WelcomeComponent }
    ])
  ],
  declarations: [
    WelcomeComponent
  ],
  providers: []  
})
export class WelcomeModule {}
