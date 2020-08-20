// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CURRENT
import {
  GitApiService,
  UserAuthApiService,
  UserService
} from '@core/services';

import { INTERCEPTORS } from './interseptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    GitApiService,
    UserAuthApiService,
    UserService,
    INTERCEPTORS
  ]
})
export class CoreModule {
}
