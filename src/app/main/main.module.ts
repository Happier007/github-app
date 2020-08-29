// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CORE
import { CoreModule } from '../core';

// MATERIAL
import { MaterialModule } from '../material';

// SHARED
import { SharedModule } from '../shared';

// SUB-MODULES
import { NavBarModule } from '../sub-modules';

// CURRENT
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GistsService } from './services';
import * as components from './components';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    MainComponent,
    components.GistsTableComponent,
    components.GistDetailComponent,
    components.UsersListComponent,
    components.ReposListComponent,
    components.ProfileComponent,
    components.UserGistsComponent,
    components.UserReposComponent,
    components.UserProjectsComponent,
    components.UserOverviewComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    MainRoutingModule,
    NavBarModule,
    MatTooltipModule
  ],
  providers: [
    GistsService
  ]
})
export class MainModule {
}
