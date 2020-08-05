// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModule } from '../material';

// MAIN
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        MainRoutingModule,
    ]
})
export class MainModule {
}
