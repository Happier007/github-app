// ANGULAR
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// MATERIAL
import { MaterialModule } from '../material';

// FLEX-LAYOUT
import { FlexModule } from '@angular/flex-layout';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    ReactiveFormsModule,
    FlexModule,
    NavBarComponent
  ]
})
export class SharedModule {
}
