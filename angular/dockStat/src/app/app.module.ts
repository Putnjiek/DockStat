import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ApiService } from './services/api.service';
import { StatusCardComponent } from './components/status-card/status-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    StatusCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiService // Register ApiService as a provider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
