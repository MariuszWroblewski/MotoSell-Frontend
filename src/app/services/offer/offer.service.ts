import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../../interfaces/offer';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getOffers(): Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.apiUrl}`)
  }
  getOffer(id:number): Observable<Offer>{
    return this.http.get<Offer>(`${this.apiUrl}/${id}`)
  }
}
