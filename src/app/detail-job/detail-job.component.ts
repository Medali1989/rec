import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from '../company-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { JobApiService } from '../job-api.service';
import { ProfilApiService } from '../profil-api.service';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css']
})
export class DetailJobComponent implements OnInit {

  job;
  user;
  company;
  profile;
  applyed;
  constructor(private dataRoute: ActivatedRoute,private url: ActivatedRoute,private jas : JobApiService, private route : Router, private Auth : AuthService, private pas : ProfilApiService) {
    const key: String = this.dataRoute.snapshot.params['id'];
    if (localStorage.getItem('token')){
      this.user = this.Auth.connectedUser;
    }
    if (this.user.profile){
      this.pas.GetProfilById(this.user.profile).subscribe(res => {
        this.profile = res;
      })
    }  
    this.jas.GetJobById(key).subscribe(res => {
      this.job = res;
      res['applied_profiles'].forEach(element => {
        if(element == this.user['profile']){
          console.log(true);
          this.applyed= true          
        }
        else{
          console.log(false);
          this.applyed = false
        }
      });
      console.log(res);
    });

      
  
   }

  ngOnInit() {
  }

  removeFakePathUrl(f) {     
    return f.slice(12, f.length);    
  }
  connected(){
    if(localStorage.getItem('token')){      
      return true;
    }
    else {
      return false;
    }
  }

  ApplyJob(idp,idj,body ){
    if (this.user.profile){
      this.jas.ApplyOffre(idj,idp,body).subscribe( res => {
          console.log(res);
      })
    }
  }

}
