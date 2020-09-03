// ANGULAR
import { NgModule } from '@angular/core';

// MATERIAL
import {
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatLineModule,
  MatMenuModule,
  MatCardModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTabsModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatExpansionModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatChipsModule
} from '@angular/material';

const MODULES = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatLineModule,
  MatMenuModule,
  MatCardModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTabsModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatExpansionModule,
  MatBadgeModule,
  MatChipsModule,
  MatAutocompleteModule
];

@NgModule({
  declarations: [],
  imports: [
    MODULES
  ],
  exports: [
    MODULES
  ]
})
export class MaterialModule {
}
