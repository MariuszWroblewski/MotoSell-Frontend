import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OfferService } from '../../services/offer/offer.service';
import { UserService } from '../../services/user/user.service';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
})
export class AddOfferComponent implements OnInit {
  year: number = new Date().getFullYear();
  formData = new FormData();
  form!: FormGroup;
  categories = environment.categories;
  fuel = environment.fuel;
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
  constructor(
    private offerService: OfferService,
    private userServide: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  onOfferAdd(offer: FormData): void {
    this.offerService.postOffer(offer).subscribe({
      next: (data) => console.log(data),
      error: (e) => console.error(e.error),
      complete: () => console.log('offer POSTed'),
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
        this.formData.append(
          'pub_date',
          formatDate(new Date(), 'yyyy-MM-dd', 'en')
        );
      }
      this.onOfferAdd(this.formData);
    } else {
      this.toastr.error(this.errorMessage, 'Błąd!');
    }
  }

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
