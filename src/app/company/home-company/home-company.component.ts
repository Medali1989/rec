import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from '../../company-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent implements OnInit {
  company;  
  token;  
  jobNbr;
  ListJob;
  constructor(private dataRoute: ActivatedRoute,private router : Router, private cas : CompanyApiService, private auth : AuthService) {
    
    this.token = this.auth.connectedUser;
   }

  ngOnInit() {   
    this.cas.GetCompanyId(this.token.company).subscribe(res => {
      this.company = res;
      console.log(res);

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
  setJob(id){
    this.router.navigate(['/Company/JobDetail', id]);
  }
}
