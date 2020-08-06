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
    MatMenuModule
} from '@angular/material';
import { MatListModule } from '@angular/material/list';

const MODULES = [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatLineModule,
    MatMenuModule,
    MatListModule
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
