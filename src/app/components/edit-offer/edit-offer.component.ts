import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OfferService } from '../../services/offer/offer.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css'],
})
export class EditOfferComponent implements OnInit {
  form!: FormGroup;
  categories = environment.categories;
  fuel = environment.fuel;
  constructor(
    private offerService: OfferService,
    private userServide: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      image: [''],
      title: [''],
      description: [''],
      category: [''],
      fuel: [''],
      brand: [''],
      model: [''],
      production_year: [''],
      mileage: [''],
      capacity: [''],
      power: [''],
      is_pub: false,
    });
  }
}
