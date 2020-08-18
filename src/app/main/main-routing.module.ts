// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// CORE
import { AuthGuard } from '@core/guards';

// AUTH
import { LoginComponent } from '../auth/components';

// CURRENT
import { MainComponent } from './main.component';

import {
  GistDetailComponent,
  GistsListComponent, ProfileComponent,
  ReposListComponent, UsersListComponent
} from './components';

const routes: Routes = [
  {
    path: '', component: MainComponent,

    children: [
      {
        path: 'repos',
        component: ReposListComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'gists',
        component: GistsListComponent
      },
      {
        path: 'gist/:id',
        component: GistDetailComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
