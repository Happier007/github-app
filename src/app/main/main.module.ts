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
import * as сomponents from './components';

@NgModule({
  declarations: [
    MainComponent,
    сomponents.GistsTableComponent,
    сomponents.GistDetailComponent,
    сomponents.UsersListComponent,
    сomponents.ReposListComponent,
    сomponents.ProfileComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    MainRoutingModule,
    NavBarModule
  ],
  providers: [
    GistsService
  ]
})
export class MainModule {
}
