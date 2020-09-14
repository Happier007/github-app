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

/**
 This module was made an example of a reusable module that does not depend on other modules
 and can be imported anywhere in the application
 **/
export class NavBarModule {
}
