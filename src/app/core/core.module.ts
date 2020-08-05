// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CORE
import { AuthGuard } from '@core/guards';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [AuthGuard]
})
export class CoreModule {
}
