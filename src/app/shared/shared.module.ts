// ANGULAR
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// MATERIAL
import { MaterialModule } from '../material';

// FLEX-LAYOUT
import { FlexModule } from '@angular/flex-layout';

// SHARED
import { EllipsisPipe } from './pipes/ellipsis.pipe';

@NgModule({
  declarations: [EllipsisPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
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
