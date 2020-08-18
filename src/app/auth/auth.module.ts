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
import { LoginComponent } from './components';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    SharedModule
  ],
})
export class AuthModule {
}
