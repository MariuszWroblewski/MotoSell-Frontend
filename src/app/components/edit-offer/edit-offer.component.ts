import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/interfaces/offer';
import { environment } from '../../../environments/environment';
import { OfferService } from '../../services/offer/offer.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css'],
})
export class EditOfferComponent implements OnInit {
  form!: FormGroup;
  formData = new FormData();
  categories = environment.categories;
  fuel = environment.fuel;
  year: number = new Date().getFullYear();
  myDefaultValue: string = 'sasasa';

  constructor(
    private offerService: OfferService,
    private userServide: UserService,
    private formBuilder: FormBuilder,
    private ar: ActivatedRoute
  ) {}
  private id: number = 0;
  offer!: Offer;
  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')!.setValue(file);
      this.formData.append('image', file);
    }
  }
  onGetMyOffer(id: number): void {
    this.offerService.getUserOfferDetails(id).subscribe({
      next: (data) => (this.offer = data),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
  onEditOffer(offer: FormData): void {
    this.offerService.postOffer(offer).subscribe({
      next: (data) => console.log(data),
      error: (e) => console.error(e.error),
      complete: () => console.log('offer POSTed'),
    });
  }
  onFormSubmit(): void {
    this.formData.append('title', this.form.get('title')?.value);
    this.formData.append('description', this.form.get('description')?.value);
    this.formData.append('category', this.form.get('category')?.value.abbrev);
    this.formData.append('brand', this.form.get('brand')?.value);
    this.formData.append('model', this.form.get('model')?.value);
    this.formData.append(
      'production_year',
      this.form.get('production_year')?.value
    );
    this.formData.append('mileage', this.form.get('mileage')?.value);
    this.formData.append('capacity', this.form.get('capacity')?.value);
    this.formData.append('power', this.form.get('power')?.value);
    this.formData.append('fuel', this.form.get('fuel')?.value.abbrev);
    const checkBox: any = document.querySelector('#is_pub')!;
    if (checkBox.checked) {
      this.formData.append('is_pub', 'true');
      this.formData.append(
        'pub_date',
        formatDate(new Date(), 'yyyy-MM-dd', 'en')
      );
    }
    this.onEditOffer(this.formData);
  }
  ngOnInit(): void {
    this.ar.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.onGetMyOffer(this.id);
    // this.form = this.formBuilder.group({
    //   image: [''],
    //   title: [this.offer.title],
    //   description: [this.offer.description],
    //   category: [this.offer.category],
    //   fuel: [this.offer.fuel],
    //   brand: [this.offer.brand],
    //   model: [this.offer.model],
    //   production_year: [this.offer.production_year],
    //   mileage: [this.offer.mileage],
    //   capacity: [this.offer.capacity],
    //   power: [this.offer.power],
    //   is_pub: false,
    // });
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
