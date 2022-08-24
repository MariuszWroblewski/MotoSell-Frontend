import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
  });
  user: User = {
    username: '',
    password: '',
  };
  errorMessage: string = '';
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  isValid(username: string, password1: string, password2: string): boolean {
    if (username == '' || password1 == '' || password2 == '') {
      this.errorMessage = 'Uzupełnij wszyskie pola';
      return false;
    }
    if (password1 !== password2) {
      this.errorMessage = 'Hasła nie są identyczne';
      return false;
    }
    return true;
  }
  onUserRegister(user: User): void {
    this.userService.registerUser(user).subscribe({
      next: (data) => console.log(data),
      error: (e) => console.error(e.error),
      complete: () => console.log('poszlo'),
    });
  }
  onFormSubmit(): void {
    if (
      this.isValid(
        this.registerForm.value.username!,
        this.registerForm.value.password1!,
        this.registerForm.value.password2!
      )
    ) {
      this.user.username = this.registerForm.value.username!;
      this.user.password = this.registerForm.value.password1!;
      this.onUserRegister(this.user);
    } else {
      this.toastr.error(this.errorMessage, 'Błąd!');
    }
    return;
  }

  ngOnInit(): void {}
}
