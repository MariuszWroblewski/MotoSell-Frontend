import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
  });
  user:User = {
    username: '',
    password: ''
  }
  error: string = '';
  constructor(
    private userService :UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    ){}

  isValid(username: string, password1:string, password2: string): boolean{
    if(username=='' || password1=='' || password2==''){
      this.error = "Uzupełnij wszyskie pola";
      return false;
    }
    if(password1!==password2){
      this.error = "Hasła nie są identyczne";
      return false;
    }
    return true;
  }
  clearError(){
    this.error='';
  }
  onUserRegister(user: User):void{
    this.userService.registerUser(user).subscribe(
      {
        error: (e) => console.error(e.error),
        complete: () => console.info('User registered') 
      }
      )
  }
  onFormSubmit():void{
    // if(this.isValid(this.registerForm.value.username!, this.registerForm.value.password1!, this.registerForm.value.password2!)){
      this.user.username = this.registerForm.value.username!;
      this.user.password = this.registerForm.value.password1!;
      this.onUserRegister(this.user);
    // }
    // return;
  }


  ngOnInit(): void {
  }

}