import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterProfilComponent } from './register-profil/register-profil.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { HomeCompanyComponent } from './company/home-company/home-company.component';
import { PostJobComponent } from './company/post-job/post-job.component';
import { ListJobsComponent } from './company/list-jobs/list-jobs.component';
import { JobDetailComponent } from './company/job-detail/job-detail.component';
import { DetailJobComponent} from './detail-job/detail-job.component';
import { CandidateComponent } from './candidate/candidate.component';
import { from } from 'rxjs';
import { OffersComponent } from './candidate/offers/offers.component';
import { AuthGuard } from './auth.guard';
import { ReloadTokenComponent } from './reload-token/reload-token.component';

const routes: Routes = [
  {
    path : '',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent, 
    data: {title : 'Home'}
  },
  {
    path:'RegisterProfil',
    component:RegisterProfilComponent,
    data:{title:'Register Profil'}
  },
  {
    path:'RegisterCompany',
    component:RegisterCompanyComponent,
    data:{title:'Register Company'}
  },
  {
    path:'Login',
    component:LoginComponent,
    data:{title:'Login'}
  },
  {
    path:'JobDetail/:id',
    component : DetailJobComponent,
    data : {title : 'Job Detail'}
  },
  {
    path : 'Reload',
    component : ReloadTokenComponent,
    data : {title : 'Reload'}
  },
  {
    path : 'Company',
    component : CompanyComponent,
    canActivate : [AuthGuard],
    data : {role:'company'},
    children : [
      {
        path : 'CompanyHome',
        component : HomeCompanyComponent,
        data : {title : 'Company Dashbord'}
      },
      {
        path : 'PostJob',
        component : PostJobComponent,
        data : {title : 'post Job'}
      },
      {
        path : 'ListJob',
        component : ListJobsComponent,
        data : {title : 'List Of Jobs'},
      },
      {
        path : 'JobDetail/:id',
        component : JobDetailComponent,
        data : {title : 'Job Detail'}
      }
    ]
  },
  {
    path : 'Profil',
    component : CandidateComponent,
    canActivate : [AuthGuard],
    data : {role:'profil'},
    children : [
      {
        path : 'AllJobs',
        component : OffersComponent,
        data : { title : 'AllJobs'}
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
