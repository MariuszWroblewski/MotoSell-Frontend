import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../../interfaces/offer';
import { OfferService } from '../../services/offer/offer.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {

  offers: Offer[] = [];
  constructor(
    private offerService :OfferService,
    ){}

  onGetOffers():void{
    this.offerService.getOffers().subscribe(
      (response) => {
        console.log(response);
        this.offers = response
    },
      (error: any) => console.log(error),
      () => console.log("Done getting offers")
      )
  }
  onGetOffer(id: number):void{
    this.offerService.getOffer(id).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log("Done getting offer bi ID")
      )
  }


  ngOnInit(): void {
    this.onGetOffers();
  }

}
