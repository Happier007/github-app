import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as appModules from './modules';

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        appModules.AuthModule,
        appModules.CoreModule,
        appModules.MainModule,
        appModules.MaterialModule,
        appModules.SharedModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
