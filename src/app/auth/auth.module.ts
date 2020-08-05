// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// MATERIAL
import { MaterialModule } from '../material';

// AUTH
import { UserAuthService } from '@auth/services';

// CURRENT
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        AuthRoutingModule,
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        UserAuthService
    ]
})
export class AuthModule {
}
