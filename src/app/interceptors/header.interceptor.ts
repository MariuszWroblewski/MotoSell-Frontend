import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private jwtHelper: JwtHelperService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      request = request.clone({
        setHeaders: { Authorization: `JWT ${token}` },
      });
    }
    if (
      !request.headers.has('Content-Type') &&
      !request.url.includes('offers') &&
      request.method == 'GET'
    ) {
      request = request.clone({
        setHeaders: { 'Content-Type': 'application/json' },
      });
    }
    return next.handle(request);
  }
}
