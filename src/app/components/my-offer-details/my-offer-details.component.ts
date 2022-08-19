import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../interfaces/offer';
import { OfferService } from '../../services/offer/offer.service';

@Component({
  selector: 'app-my-offer-details',
  templateUrl: './my-offer-details.component.html',
  styleUrls: ['./my-offer-details.component.css']
})
export class MyOfferDetailsComponent implements OnInit {
  private id: number= 0;
  offer!: Offer;
  public subDestription:string = this.offer.description.substring(0,50);
  constructor(private ar: ActivatedRoute,
    private offerService: OfferService) { }

  onGetMyOffer(id: number):void{
    this.offerService.getUserOfferDetails(id).subscribe(
      {
        next: (data) => this.offer=data,
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
      )
  }
  ngOnInit(): void {
    this.ar.paramMap.subscribe(params =>{
      this.id = Number(params.get('id'));
    })
  }

}
