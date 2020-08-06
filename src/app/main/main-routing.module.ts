// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// CURRENT
import { MainComponent } from './main.component';
import {
    GistsListComponent,
    GistDetailComponent
} from './components/gists';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'gists',
                component: GistsListComponent
            },
            {
                path: 'gist/:id',
                component: GistDetailComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
