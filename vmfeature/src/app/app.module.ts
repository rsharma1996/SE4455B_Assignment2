import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,MatSelectModule,MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionComponent } from './selection/selection.component';
import { NavComponent } from './nav/nav.component';
import { VmsComponent } from './vms/vms.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    NavComponent,
    VmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   BrowserAnimationsModule,MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
