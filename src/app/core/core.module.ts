// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CURRENT
import { UserAuthApiService } from '@core/services';
import { INTERCEPTORS } from './interseptors';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        UserAuthApiService,
        INTERCEPTORS
    ]
})
export class CoreModule {
}
