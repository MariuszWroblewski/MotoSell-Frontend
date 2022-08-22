import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../../interfaces/offer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getOffers(): Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.apiUrl}`);
  }
  getOfferDetails(id:number): Observable<Offer>{
    return this.http.get<Offer>(`${this.apiUrl}/${id}`);
  }
  getUserOffers(): Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.apiUrl}/my-offers`);
  }
  getUserOfferDetails(id:number): Observable<Offer>{
    return this.http.get<Offer>(`${this.apiUrl}/my-offers/${id}`);
  }
  postOffer(offer: FormData): Observable<FormData>{
    return this.http.post<FormData>(`${this.apiUrl}`, offer)
  }
  deleteUserOffer(id: string): Observable<Offer>{
    return this.http.delete<Offer>(`${this.apiUrl}/my-offers/${id}`);
  }
  patchUserOffer(id: string, body: Offer): Observable<Offer>{
    return this.http.put<Offer>(`${this.apiUrl}/my-offers/${id}`,body);
  }
}
