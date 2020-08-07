// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModule } from '../material';

// CURRENT
import { LoginComponent } from './components';
import { UserAuthService } from './services';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    providers: [
        UserAuthService
    ]
})
export class AuthModule {
}
