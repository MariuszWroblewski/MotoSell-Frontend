import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Offer } from '../../interfaces/offer';
import { OfferService } from '../../services/offer/offer.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {

  offers: Offer[] = [];
  constructor(private offerService: OfferService,
    private userService :UserService){}

  onGetOffers():void{
    this.offerService.getOffers().subscribe(
      {
        next: (data) => {this.offers=data, console.log(data)},
        error: (e) => console.error(e),
        complete: () => console.log("Offers Getting done"), 
      }
  )
  }

  ngOnInit(): void {
    this.onGetOffers();
  }

}
