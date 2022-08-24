import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../interfaces/offer';
import { OfferService } from '../../services/offer/offer.service';
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  id: number = 0;
  offer!: Offer;
  constructor(private ar: ActivatedRoute, private offerService: OfferService) {}

  onGetOffer(id: number): void {
    this.offerService.getOfferDetails(id).subscribe({
      next: (data) => (this.offer = data),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
  ngOnInit(): void {
    this.ar.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.onGetOffer(this.id);
  }
}
