import { Component, OnInit } from '@angular/core';
import { Offer } from '../../interfaces/offer';
import { OfferService } from '../../services/offer/offer.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  offers: Offer[] = [];
  constructor(private offerService: OfferService,
    private userService :UserService
  ){}

  onGetOffers():void{
    this.offerService.getUserOffers().subscribe(
      {
        next: (data) => this.offers=data,
        error: (e) => console.error(e),
        complete: () => {
          console.log(this.offers);
        } 
      }
  )
  }

  ngOnInit(): void {
    this.onGetOffers();
    let toke = this.userService.decodeToken();
    console.log("tokrn",toke );
  }

}
