// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MATERIAL
import { MaterialModule } from '../../material';

// FLEX-LAYOUT
import { FlexModule } from '@angular/flex-layout';

// CURRENT
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule {
}
