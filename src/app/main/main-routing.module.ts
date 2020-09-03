// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// CORE
import { AuthGuard } from '@core/guards';

// CURRENT
import { MainComponent } from './main.component';
import {
  GistDetailComponent,
  GistsTableComponent,
  ProfileComponent,
  ReposTableComponent,
  UsersListComponent
} from './components';

const routes: Routes = [
  {
    path: '', component: MainComponent,

    children: [
      {
        path: 'repos',
        component: ReposTableComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'gists',
        component: GistsTableComponent
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
