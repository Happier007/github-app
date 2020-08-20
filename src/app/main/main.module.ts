// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CORE
import { CoreModule } from '../core';
import { GitApiService } from '@core/services';

// MATERIAL
import { MaterialModule } from '../material';

// SHARED
import { SharedModule } from '../shared';

// AUTH
import { AuthModule } from '../auth';

// CURRENT
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import * as mainComponents from './components';
import { MatExpansionModule } from '@angular/material/expansion';

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
    AuthModule,
    MainRoutingModule,
    MatExpansionModule,
  ],
  providers: [
    GitApiService
  ]
})
export class MainModule {
}
