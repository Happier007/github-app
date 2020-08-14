// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CORE
import { CoreModule } from '../core';

// MATERIAL
import { MaterialModule } from '../material';

// SHARED
import { SharedModule } from '../shared';

// CURRENT
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    declarations: [
        MainComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        MaterialModule,
        SharedModule,
        MainRoutingModule
    ],
})
export class MainModule {
}
