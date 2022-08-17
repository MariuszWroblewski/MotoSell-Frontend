import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  private user: User = {
    username: '',
    password: ''
  }
  error: string = '';
  isValid(user: User){
    if(!user.username || !user.password){
      this.error = "Uzupełnij wszystkie pola formularza"
    }
    
  }
  constructor(private userService :UserService) { }

  ngOnInit(): void {
  }
  onUserLogin(user: User):void{
    this.userService.login(user).subscribe(
      {
        error: (e) => console.error(e.error),
        complete: () => console.info("Is user logged in", this.userService.loggedIn) 
      }
      )
  }
  onFormSubmit():void{
    this.user.username = this.loginForm.value.username!;
    this.user.password = this.loginForm.value.password!;
    console.log(this.user.username, this.user.password);
    this.onUserLogin(this.user);
  }

}
