import { NgModule } from '@angular/core';
import {
    MatSelectModule,
    MatInputModule
} from '@angular/material';

const MODULES = [
    MatInputModule,
    MatSelectModule,
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
