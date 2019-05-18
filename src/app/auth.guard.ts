import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private route : Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.auth.decodeToken() !== null){
      if(this.auth.verifToken() === false){
       if(next.data.role && next.data.role == this.auth.decodeToken().role){
        return true;
       }        
      }else{
        this.route.navigateByUrl('/Reload');
      }
    }else {
      this.route.navigateByUrl('/Login');
    }    
  }
  
}
