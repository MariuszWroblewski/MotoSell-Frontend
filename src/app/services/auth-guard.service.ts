import { Injectable } from '@angular/core';
import { UserService } from './user/user.service';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: UserService,public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
