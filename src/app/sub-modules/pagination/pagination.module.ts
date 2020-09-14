// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModule } from '../../material';

// FLEX-LAYOUT
import { FlexModule } from '@angular/flex-layout';

// CURRENT
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule {
}
