import { Component, OnInit } from '@angular/core';
import { Offer } from './interfaces/offer';
import { OfferService } from './services/offer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MotoSell';
  offers: Offer[] = [];
  constructor(private offerServic :OfferService){}

  onGetOffers():void{
    this.offerServic.getOffers().subscribe(
      (response) => {
        console.log(response);
        this.offers = response
    },
      (error: any) => console.log(error),
      () => console.log("Done getting users")
      )
  }
  onGetOffer(id: number):void{
    this.offerServic.getOffer(id).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log("Done getting user")
      )
  }

  ngOnInit(): void {
    this.onGetOffers();
    this.onGetOffer(1);
  }
}
