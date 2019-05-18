import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from '../../company-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {

  company;  
  token;  
  jobNbr;
  ListJob;
  localJob;
  constructor(private router : Router, private cas : CompanyApiService, private auth : AuthService) {
    this.token = this.auth.connectedUser;
  }

  ngOnInit() {
    this.cas.GetCompanyId(this.token.company).subscribe(res => {
      this.company = res;

      this.cas.GetJobByCompany(this.token.company).subscribe(res => {
        this.ListJob = res;
      })
    })
  }

  removeFakePathUrl(f) {     
    if(f)   {
      return f.slice(12, f.length); 
    }    
  }
  ConfirmJob(id, body){
    this.cas.PublishOffre(id, body).subscribe(res => {
      console.log(res);
    })
  }
  setJob(id){
    localStorage.setItem('job',id);
    this.router.navigateByUrl('Company/JobDetail');
  }
}
