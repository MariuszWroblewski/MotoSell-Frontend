import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OffersListComponent } from './components/offers-list/offers-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { httpInterceptorProviders } from './/interceptors/index';
@NgModule({
  declarations: [
    AppComponent,
    OffersListComponent,
    NavbarComponent,
    OfferDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AddOfferComponent,
    MyOffersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
