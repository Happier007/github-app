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

import * as mainComponents from './components';

@NgModule({
  declarations: [
    MainComponent,
    mainComponents.GistsListComponent,
    mainComponents.GistDetailComponent,
    mainComponents.UsersListComponent,
    mainComponents.ReposListComponent,
    mainComponents.ProfileComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    MainRoutingModule,
    NavBarModule
  ],
})
export class MainModule {
}
