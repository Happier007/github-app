// ANGULAR
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// MATERIAL
import { MaterialModule } from '../material';

// FLEX-LAYOUT
import { FlexModule } from '@angular/flex-layout';

// SUB-MODULES
import { NavBarModule } from '../sub-modules';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexModule,
    NavBarModule
  ],
  exports: [
    ReactiveFormsModule,
    FlexModule,
    NavBarModule
  ]
})
export class SharedModule {
}
