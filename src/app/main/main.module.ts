// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

// CORE
import { CoreModule } from '../core';
import {
  UserAuthorizedProfileResolver,
  UserProfileResolver
} from '../core/resolvers';

// MATERIAL
import { MaterialModule } from '../material';

// SHARED
import { SharedModule } from '../shared';

// SUB-MODULES
import {
  NavBarModule,
  PaginationModule
} from '../sub-modules';

// CURRENT
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {
  GistsService,
  UserCommitsActivityService,
  ReposTableService,
  UsersTableService,
} from './services';
import * as components from './components';


@NgModule({
  declarations: [
    MainComponent,
    components.GistsTableComponent,
    components.GistDetailComponent,
    components.UsersTableComponent,
    components.ReposTableComponent,
    components.ProfileComponent,
    components.UserGistsComponent,
    components.UserReposComponent,
    components.UserProjectsComponent,
    components.UserOverviewComponent,
    components.SearchReposComponent,
    components.ReposDetailComponent,
    components.SearchUsersComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    MainRoutingModule,
    NavBarModule,
    PaginationModule,
    MatTooltipModule,
  ],
  providers: [
    GistsService,
    UserCommitsActivityService,
    ReposTableService,
    UsersTableService,
    UserProfileResolver,
    UserAuthorizedProfileResolver
  ]
})
export class MainModule {
}
