import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BuyDialog } from './buy-dialog/buy-dialog.dialog';
import { FormsModule } from '@angular/forms';
import { CartSheet } from './cart-sheet/cart-sheet.sheet';
import { CleanCartDialog } from './cart-sheet/clean-cart/clean-cart.dialog';

@NgModule({
  declarations: [
    AppComponent,
    BuyDialog,
    CleanCartDialog,
    CartSheet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ParallaxModule,
    MaterialModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule
  ],
  providers: [ ],
  entryComponents: [AppComponent, BuyDialog, CleanCartDialog, CartSheet],
  bootstrap: [AppComponent]
})
export class AppModule { }
