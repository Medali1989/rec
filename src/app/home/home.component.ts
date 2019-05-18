import { Component, OnInit } from '@angular/core';
import { JobApiService } from '../job-api.service';
import { CompanyApiService } from '../company-api.service';
import { FormGroup,FormGroupDirective, Validators,NgForm, FormArray, FormControl} from '@angular/forms';
import { Control } from '../control';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  AllJobActive;
  isConnected;  
  tableActive=[];
  constructor(private jas : JobApiService, private route : Router, private auth:AuthService) {
    if (localStorage.getItem('token')){
      this.user = this.auth.connectedUser;
      this.isConnected = true;
    }
    else {
      this.isConnected = false;
    }
    this.jas.GetAllJobs().subscribe(res => {
      this.AllJobActive = res;
      
      this.tableActive.push(this.AllJobActive[this.AllJobActive.length-1]);
      this.tableActive.push(this.AllJobActive[this.AllJobActive.length-2]);
      this.tableActive.push(this.AllJobActive[this.AllJobActive.length-3]);
    })
   }

  ngOnInit() {
    if (localStorage.getItem('token')){
      if(this.auth.verifToken() === false){
        return true;
      }else{
        localStorage.removeItem('token');
      }
    }
    console.log(this.auth.verifToken())
    // this.tableActive.push(this.AllJobActive[2]);
    // console.log(this.AllJobActive[2]);
  }

  removeFakePathUrl(f) {     
    if(f)   {
      return f.slice(12, f.length); 
    }  
  }
  setjob(id){
    localStorage.setItem('job', id);
    this.route.navigateByUrl('/JobDetail');
  }

}
