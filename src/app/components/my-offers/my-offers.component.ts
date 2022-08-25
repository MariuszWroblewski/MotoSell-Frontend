import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offer } from '../../interfaces/offer';
import { OfferService } from '../../services/offer/offer.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css'],
})
export class MyOffersComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  isDeleted: any = sessionStorage.getItem('deleted');
  isPublished: any = sessionStorage.getItem('published');
  constructor(
    private offerService: OfferService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onGetOffers(): void {
    this.offerService.getUserOffers().subscribe({
      next: (data) => (this.offers = data),
      error: (e) => console.error(e),
      complete: () => {
        console.log(this.offers);
      },
    });
  }
  onDeleteOffer(id: number): void {
    this.offerService.deleteUserOffer(id).subscribe({
      next: (data) => console.log(data),
      error: (e) => console.error(e),
      complete: () => console.log('done deleting'),
    });
  }
  onPublishOffer(id: number): void {
    this.offerService.publishUserOffer(id).subscribe({
      next: (data) => console.log(data),
      error: (e) => console.error(e),
      complete: () => console.log('done publishing'),
    });
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
    this.onGetOffers();
    if (this.isDeleted) {
      this.toastr.info('Oferta została usunięta', 'Udało się!');
    }
    if (this.isPublished) {
      this.toastr.info('Oferta została opublikowana', 'Udało się!');
    }
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('deleted');
    sessionStorage.removeItem('published');
  }
}
