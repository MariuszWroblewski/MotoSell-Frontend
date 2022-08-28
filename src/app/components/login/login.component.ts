import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../interfaces/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  isRegistered = sessionStorage.getItem('registered');
  private user: User = {
    username: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    sessionStorage.removeItem('registered');
  }
  isValid(username: string, password: string): boolean {
    if (username == '' || password == '') {
      this.errorMessage = 'Uzupełnij wszyskie pola';
      return false;
    }
    return true;
  }
  ngOnInit(): void {
    if (this.isRegistered) {
      this.toastr.success(
        'Pomyślnie utworzono konto. Możesz się teraz na nie zalogować',
        'Udało się!'
      );
    }
  }
  onUserLogin(user: User): void {
    this.userService.login(user).subscribe({
      error: (e) => console.error(e.error),
      complete: () =>
        console.info('Is user logged in', this.userService.isAuthenticated()),
    });
  }
  onFormSubmit(): void {
    if (
      this.isValid(
        this.loginForm.value.username!,
        this.loginForm.value.password!
      )
    ) {
      this.user.username = this.loginForm.value.username!;
      this.user.password = this.loginForm.value.password!;
      this.onUserLogin(this.user);
    } else {
      this.toastr.error(this.errorMessage, 'Błąd!');
    }
  }
}
