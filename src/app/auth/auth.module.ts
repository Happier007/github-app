// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModule } from '../material';

// SHARED
import { SharedModule } from '../shared';

// CURRENT
import { UserAuthApiService } from './services';
import { LoginComponent } from './components';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule
    ],
    providers: [
        UserAuthApiService
    ]
})
export class AuthModule {
}
