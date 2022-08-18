import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OffersListComponent } from './components/offers-list/offers-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: OffersListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'details/:id', component: OfferDetailsComponent },
  { path: 'add', component: AddOfferComponent, canActivate: [AuthGuardService] },
  { path: 'my-offers', component: MyOffersComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
