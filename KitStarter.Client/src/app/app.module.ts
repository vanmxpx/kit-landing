import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BuyDialog } from './components/buy-dialog/buy-dialog.dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CleanCartDialog } from './components/cart-sheet/clean-cart/clean-cart.dialog';
import { CartSheet } from './components/cart-sheet/cart-sheet.sheet';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { FooterComponent } from './components/footer/footer.component';
import { CallOfferComponent} from './components/calloffer/calloffer.component';
import { WINDOW_PROVIDERS } from './services/window.service';
import { CostViewPipe } from './pipes/cost-view.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium, faTwitter, faTelegram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { ProductInfoDialog } from './components/product-info-dialog/product-info-dialog.dialog';
import { QuantityComponent } from './components/controls/quantity/quantity.component';
import { IntegerDirective } from './directives/integer-input.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BuyDialog,
    CleanCartDialog,
    ProductInfoDialog,
    CartSheet,
    ProductCategoryComponent,
    FooterComponent,
    CallOfferComponent,
    QuantityComponent,
    CostViewPipe,
    IntegerDirective
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ParallaxModule,
    MaterialModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule
  ],
  providers: [ WINDOW_PROVIDERS ],
  entryComponents: [AppComponent, BuyDialog, CleanCartDialog, ProductInfoDialog, CartSheet],
  bootstrap: [AppComponent]
})
export class AppModule {

    constructor() {
        library.add(faTwitterSquare, faGithub, faTelegram);
    }
}
