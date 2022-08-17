import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');
    if (token){
      request = request.clone({setHeaders: { Authorization: `JWT ${token}` }})
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ setHeaders: {'Content-Type': 'application/json'}});
  }
    return next.handle(request);
  }
}
