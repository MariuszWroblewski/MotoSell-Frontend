import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService,
  public jwtHelper: JwtHelperService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = this.userService.getAccesToken();
    const refresh_token = this.userService.getRefreshToken();
    if(access_token && refresh_token){
        if(this.jwtHelper.isTokenExpired(refresh_token)){
            this.userService.logout();
            return next.handle(request);
        }
        else if(this.jwtHelper.isTokenExpired(access_token) && !request.url.includes('user/login/refresh')){
            this.userService.refreshToken(refresh_token)
                .subscribe(
                    {
                        next: (data: any) => this.userService.saveAccessToken(data.access),
                        error: (e) => console.error(e.error),
                        complete: () => console.log("done getting new access token"),
                      }
                )
        }
    }
    console.log("Request: ", request);
    return next.handle(request);
}
}
