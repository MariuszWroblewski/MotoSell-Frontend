import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Offer } from '../../interfaces/offer';
import { OfferService } from '../../services/offer/offer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css'],
})
export class OffersListComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  logout = sessionStorage.getItem('logout');
  constructor(
    private offerService: OfferService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    sessionStorage.removeItem('logout');
  }

  onGetOffers(): void {
    this.offerService.getOffers().subscribe({
      next: (data) => (this.offers = data),
      error: (e) => console.error(e),
      complete: () => console.log('Offers Getting done'),
    });
  }

  ngOnInit(): void {
    this.onGetOffers();
    if (this.logout) {
      this.toastr.success('Zostałeś pomyślnie wylogowany', 'Udało się!');
    }
  }
}
