// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModule } from '../material';

// CURRENT
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import {
    GistsListComponent,
    GistDetailComponent
} from './components/gists';
import { GitApiService } from '@main/services';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [
        MainComponent,
        GistsListComponent,
        GistDetailComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        MainRoutingModule,
        MatTabsModule,
        MatBadgeModule,
        MatPaginatorModule,
    ],
    providers: [
        GitApiService
    ]
})
export class MainModule {
}
