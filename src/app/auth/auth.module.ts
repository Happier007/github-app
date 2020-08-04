// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModule} from '../material/material.module';

// CURRENT
import { LoginComponent } from './components';
import { AuthService } from './services';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {
}
