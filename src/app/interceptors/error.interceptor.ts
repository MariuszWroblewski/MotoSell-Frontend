import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastrs: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((res) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Błąd: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400:
              errorMessage = 'Błędne dane formularza.';
              break;
            case 401:
              errorMessage =
                'Nie zostałeś poprawnie zautoryzowany. Sprawdź dane logowania';
              break;
            case 403:
              errorMessage =
                'Nie posiadasz odpowiednich uprawnien do wykanania tej akcji';
              break;
            case 404:
              errorMessage = 'The requested resource does not exist.';
              break;
            case 412:
              errorMessage = 'Precondition Failed.';
              break;
            case 500:
              errorMessage = 'Błąd wewnetrzny serwera';
              break;
            case 503:
              errorMessage = 'Serwer nie jest obecnie dostepny';
              break;
            case 422:
              errorMessage = 'Błedy w formularzu!';
              break;
            default:
              errorMessage = 'Coś poszło nie tak, spróbuj ponownie!';
          }
        }
        if (errorMessage) {
          this.toastrs.error(errorMessage, 'Błąd!');
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
