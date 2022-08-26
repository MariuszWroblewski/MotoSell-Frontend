import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Offer } from '../../interfaces/offer';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}`);
  }
  getOfferDetails(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/${id}`);
  }
  getUserOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/my-offers`);
  }
  getUserOfferDetails(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/my-offers/${id}`);
  }
  postOffer(offer: FormData): Observable<FormData> {
    return this.http
      .post<FormData>(`${this.apiUrl}`, offer)
      .pipe(
        tap(() =>
          this.router
            .navigate(['my-offers'])
            .then(() =>
              this.toastr.success(
                'Oferta została pomyślnie utworzona',
                'Udało się!'
              )
            )
        )
      );
  }
  deleteUserOffer(id: number): Observable<Offer> {
    return this.http.delete<Offer>(`${this.apiUrl}/my-offers/${id}`).pipe(
      tap(() => {
        window.location.reload();
        sessionStorage.setItem('deleted', 'true');
      })
    );
  }
  putUserOffer(id: string, body: FormData): Observable<FormData> {
    return this.http
      .put<FormData>(`${this.apiUrl}/my-offers/${id}`, body)
      .pipe(
        tap(() =>
          this.router
            .navigate(['mydetails'])
            .then(() =>
              this.toastr.success(
                'Oferta została pomyślnie edytowana',
                'Udało się!'
              )
            )
        )
      );
  }
  publishUserOffer(id: number): Observable<Offer> {
    return this.http
      .patch<Offer>(`${this.apiUrl}/my-offers/publish/${id}`, {
        is_pub: true,
        pub_date: formatDate(new Date(), 'yyy-MM-dd', 'en'),
      })
      .pipe(
        tap(() => {
          window.location.reload();
          sessionStorage.setItem('published', 'true');
        })
      );
  }
}
