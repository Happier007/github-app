// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CURRENT
import { LoginComponent } from './components';
import { AuthService } from './services';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {
}
