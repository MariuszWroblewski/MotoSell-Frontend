import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private formBuilder: FormBuilder,
    private ar: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  private id: number = 0;
  offer!: Offer;
  errorMessage: string = '';
  isValid(): boolean {
    if (
      this.form.get('title')?.value == '' ||
      this.form.get('description')?.value == '' ||
      this.form.get('title')?.value == '' ||
      this.form.get('category')?.value == '' ||
      this.form.get('brand')?.value == '' ||
      this.form.get('model')?.value == '' ||
      this.form.get('fuel')?.value == '' ||
      this.form.get('production_year')?.value == '' ||
      this.form.get('mileage')?.value == '' ||
      this.form.get('capacity')?.value == ''
    ) {
      this.errorMessage = 'Uzupełnij wszystkie pola formularza';
      return false;
    }
    if (this.form.get('title')?.value.length > 64) {
      this.errorMessage = 'Tytuł nie może mieć więcej niż 64 znaki';
      return false;
    }
    if (this.form.get('brand')?.value.length > 64) {
      this.errorMessage = 'Marka nie może mieć więcej niż 32 znaki';
      return false;
    }
    if (this.form.get('model')?.value.length > 64) {
      this.errorMessage = 'Model nie może mieć więcej niż 32 znaki';
      return false;
    }
    if (
      this.form.get('production_year')?.value < 1800 ||
      this.form.get('production_year')?.value > this.year
    ) {
      this.errorMessage =
        'Rok produkcji nie może być wczesniejszy niż 1800 i pożniejszy niż obecny';
      return false;
    }
    if (this.form.get('mileage')?.value < 0) {
      this.errorMessage = 'Błedny przebieg';
      return false;
    }
    if (this.form.get('capacity')?.value < 0) {
      this.errorMessage = 'Błedna pojemność skokowa';
      return false;
    }
    if (this.form.get('power')?.value < 0) {
      this.errorMessage = 'Błedna moc';
      return false;
    }
    return true;
  }
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
    this.offerService
      .patchUserOffer(this.form.get('id')?.value, offer)
      .subscribe({
        next: (data) => console.log(data),
        error: (e) => console.error(e.error),
        complete: () => console.log('offer PATCHed'),
      });
  }
  onFormSubmit(): void {
    if (this.isValid()) {
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
        if (!this.offer.is_pub) {
          this.formData.append(
            'pub_date',
            formatDate(new Date(), 'yyyy-MM-dd', 'en')
          );
        }
      } else {
        this.formData.append('is_pub', 'false');
      }
      this.onEditOffer(this.formData);
    } else {
      this.toastr.error(this.errorMessage, 'Błąd!');
    }
  }
  ngOnInit(): void {
    this.ar.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.onGetMyOffer(this.id);

    this.form = this.formBuilder.group({
      id: [''],
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
