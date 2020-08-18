// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// FLEX-LAYOUT
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexModule
  ],
  exports: [
    ReactiveFormsModule,
    FlexModule
  ]
})
export class SharedModule {
}
