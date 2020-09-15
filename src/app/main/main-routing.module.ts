// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// CORE
import { AuthGuard } from '@core/guards';
import {
  UserAuthorizedProfileResolver,
  UserProfileResolver
} from '../core/resolvers';

// CURRENT
import { MainComponent } from './main.component';
import {
  GistDetailComponent,
  GistsTableComponent,
  ProfileComponent,
  ReposDetailComponent,
  ReposTableComponent,
  UsersTableComponent,
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
        path: 'repos/:username/:reponame',
        component: ReposDetailComponent
      },
      {
        path: 'users',
        component: UsersTableComponent
      },
      {
        path: 'users/:username',
        component: ProfileComponent,
        resolve: {
          user: UserProfileResolver
        }
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
        resolve: {
          user: UserAuthorizedProfileResolver
        },
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
