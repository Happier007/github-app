// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CURRENT
import {
  GistsApiService,
  ProjectsApiService,
  ReposApiService,
  StatisticsApiService,
  UserAuthApiService, UsersApiService,
  UserService
} from '@core/services';
import { INTERCEPTORS } from './interseptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProjectsApiService,
    GistsApiService,
    ReposApiService,
    StatisticsApiService,
    UserAuthApiService,
    UserService,
    UsersApiService,
    INTERCEPTORS
  ]
})
export class CoreModule {
}
