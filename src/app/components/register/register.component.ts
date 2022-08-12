import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any = {
    username: null,
    password: null,
  };
  user: User = {
    username: '', 
    password: ''
  };

  constructor(
    private userService :UserService,
    private formBuilder: FormBuilder,
    ){}
    
  onUserRegister(user: User):void{
    this.userService.registerUser(user).subscribe(
      (response) => {
        console.log(response);
        user = response
    },
      (error: any) => console.log(error),
      () => console.log("Done getting offers")
      )
  }
  onFormSubmit():void{
    const {username, password} = this.registerForm;
    this.user.username = this.registerForm.username;
    this.user.password = this.registerForm.password;
    console.log(this.registerForm.username);
    this.onUserRegister(this.user);
  }


  ngOnInit(): void {
    
  }

}