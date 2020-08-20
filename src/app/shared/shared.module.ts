// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// FLEX-LAYOUT
import { FlexModule } from '@angular/flex-layout';

// SHARED
import { EllipsisPipe } from './pipes/ellipsis.pipe';

@NgModule({
  declarations: [EllipsisPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexModule
  ],
  exports: [
    ReactiveFormsModule,
    FlexModule,
    EllipsisPipe
  ]
})
export class SharedModule {
}
