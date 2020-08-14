// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// CORE
import { AuthGuard } from '@core/guards';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: './main/main.module#MainModule'
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})
export class AppRoutingModule {
}
