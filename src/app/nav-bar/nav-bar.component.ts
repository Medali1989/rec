import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { CompanyApiService } from '../company-api.service';
import { ProfilApiService } from '../profil-api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    
  user;
  connected;
  company;
  profil;
  constructor(private auth : AuthService, private cas : CompanyApiService, private pas : ProfilApiService) {
      
      if (localStorage.getItem('token')){
        this.connected = true
        this.user = this.auth.connectedUser;  
        if(this.user.company){
          this.cas.GetCompanyId(this.user.company).subscribe(res => {
             
             this.company = res;
          })
        }
        if (this.user.profile){
          this.pas.GetProfilById(this.user.profile).subscribe(res => {
            this.profil = res;
          })
        }
      }
      else{
        this.connected = false;
        this.user = false;
      }
   }

  ngOnInit() {
  }


  logout(){
    localStorage.removeItem('token');
    location.reload();
  }
}
