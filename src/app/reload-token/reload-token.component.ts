import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserApiService } from '../user-api.service';
import { FormGroup,FormGroupDirective, Validators,NgForm, FormArray, FormControl} from '@angular/forms';
import { Control } from '../control';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reload-token',
  templateUrl: './reload-token.component.html',
  styleUrls: ['./reload-token.component.css']
})
export class ReloadTokenComponent implements OnInit {
  UserCo;
  User : FormGroup;
  constructor(private auth : AuthService, private uas : UserApiService, private route : Router) {
    this.UserCo = this.auth.connectedUser;
    this.User = new FormGroup({      
      password:new FormControl('',[Validators.required, Validators.minLength(8)]),    
  });
   }

  ngOnInit() {
  }

  Reload(email,User){
    this.auth.ReloadToken(email,User.value).subscribe(res => {
      this.auth.setToken(res['access_token']);
    })
  }
}
