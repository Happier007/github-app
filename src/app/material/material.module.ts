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
