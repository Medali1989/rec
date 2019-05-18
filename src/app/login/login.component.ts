import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserApiService } from '../user-api.service';
import { FormGroup,FormGroupDirective, Validators,NgForm, FormArray, FormControl} from '@angular/forms';
import { Control } from '../control';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  exist;
  User : FormGroup;
  constructor(private Auth : AuthService, private uas : UserApiService, private route : Router) { 
    this.User = new FormGroup({      
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required, Validators.minLength(8)]),    
  });
  }

  ngOnInit() {
  }

  Login(form){
    this.Auth.login(form.value).subscribe(res => {
      if(res['success']){
        this.Auth.setToken(res['access_token']);
        this.Auth.connectedUser = this.Auth.decodeToken();
        this.route.navigateByUrl('/home');

      }
      else{
        alert(res['message']);
      }

    })
  }

  existt (){
    this.uas.GetUserEmail(this.User.value.email).subscribe(res => {
      
      this.exist = res;
      if(this.exist === true){
        this.User.controls.email.setErrors({valid : false})
      }
      
    })}
}
