import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { HeaderInterceptor } from './header.interceptor';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
];