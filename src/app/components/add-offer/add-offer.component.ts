import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OfferService } from '../../services/offer/offer.service';
import { UserService } from '../../services/user/user.service';
import { Offer } from '../../interfaces/offer';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  token: any = this.userServide.decodeToken();
  user: string = this.token.user_id;
  year: number = new Date().getFullYear();
  categories = [
    {name: 'Osobowy', abbrev: 'osobowy'},
    {name: 'Motocykl', abbrev: 'motocykl'},
    {name: 'Ciężarowy', abbrev: 'ciezarowy'},
  ];
  fuel = [
    {name: 'Benzyna', abbrev: 'pb'},
    {name: 'Diesel', abbrev: 'on'},
    {name: 'LPG', abbrev: 'lpg'},
  ];
  offer: Offer={
    title: '',
    description: '',
    brand: '',
    model: '',
    add_date: '',
    capacity: 0,
    category: '',
    fuel: '',
    image: '',
    power: 0,
    is_pub: false,
    mileage: 0,
    production_year: 0,
    pub_date: null,
    user: '',
    id: 0,
  };
  addOfferForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(this.categories[0]),
    brand: new FormControl(''),
    model: new FormControl(''),
    production_year: new FormControl(null),
    mileage: new FormControl(null),
    capacity: new FormControl(null),
    power: new FormControl(null),
    fuel: new FormControl(this.fuel[0]),
    user: new FormControl(''),
    image: new FormControl(null),
    is_pub: new FormControl(false),
    pub_date : new FormControl(null),
  });
  constructor(private offerService: OfferService,
    private userServide: UserService) { }
  onOfferAdd(offer: Offer):void{
    this.offerService.postOffer(offer).subscribe(
      {
        error: (e) => console.error(e.error),
        complete: () => console.log("offer POSTed") 
      }
      )
  }
  formatDate(date:string) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  onFormSubmit():void{
    console.log('done');
    this.offer.title = this.addOfferForm.value.title!;
    this.offer.description = this.addOfferForm.value.description!;
    this.offer.category = this.addOfferForm.value.category?.abbrev!;
    this.offer.brand = this.addOfferForm.value.brand!;
    this.offer.model = this.addOfferForm.value.model!;
    this.offer.production_year = this.addOfferForm.value.production_year!;
    this.offer.mileage = this.addOfferForm.value.mileage!;
    this.offer.capacity = this.addOfferForm.value.capacity!;
    this.offer.power = this.addOfferForm.value.power!;
    this.offer.fuel = this.addOfferForm.value.fuel?.abbrev!;
    this.offer.image = this.addOfferForm.value.image!;
    const checkBox: any = document.querySelector('#is_pub')!;
    this.offer.user = this.user;
    // if(this.offer.image!='')
    // {
    //   let image: string = this.offer.image;
    //   this.offer.image = JSON.stringify(image.substring(image.lastIndexOf("\\") + 1, image.length));
    // }
    if(checkBox.checked)
    {
      this.offer.is_pub = true;
      this.offer.pub_date = this.formatDate(new Date().toString());
      console.log("Data publikacji", this.offer.pub_date)
    }
    console.log(this.onOfferAdd(this.offer));
  }

  ngOnInit(): void {
    
  }
  
}
