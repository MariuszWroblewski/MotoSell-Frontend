import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../../interfaces/offer';
import { OfferService } from '../../services/offer/offer.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css'],
})
export class MyOffersComponent implements OnInit {
  offers: Offer[] = [];

  constructor(
    private offerService: OfferService,
    private userService: UserService,
    private router: Router
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
      complete: () => console.log('dene deleting'),
    });
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
    this.onGetOffers();
  }
}
