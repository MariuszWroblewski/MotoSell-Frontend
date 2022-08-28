import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../interfaces/token';
import { User } from '../../interfaces/user';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiAuth = environment.apiAuth;

  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiAuth}/register/`, user).pipe(
      tap((res) => {
        sessionStorage.setItem('registered', 'true');
        this.router.navigate(['login']);
      })
    );
  }

  login(user: User) {
    return this.http.post<Token>(`${this.apiAuth}/login/`, user).pipe(
      tap((res) => {
        console.log(res.access);
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        console.log('acces token=', localStorage.getItem('access_token'));
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      sessionStorage.setItem('logout', 'true');
      window.location.reload();
    });
  }
  getAccesToken() {
    return localStorage.getItem('access_token');
  }
  saveAccessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
  }
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
  refreshToken(token: string) {
    return this.http.post(`${this.apiAuth}/login/refresh/`, { refresh: token });
  }
  isAuthenticated(): boolean {
    const token: string = localStorage.getItem('access_token')!;
    return !this.jwtHelper.isTokenExpired(token);
  }
  decodeToken(): any {
    const token: string = localStorage.getItem('access_token')!;
    return this.jwtHelper.decodeToken(token);
  }
}
