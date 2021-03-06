import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TipButtonComponent } from './tip-button/tip-button.component';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, TipButtonComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
