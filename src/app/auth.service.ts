import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser:any;
  constructor(private http : HttpClient) {
    this.connectedUser = this.decodeToken();
   }

  registerProfil (body){
    
    return this.http.post('http://localhost:4000/User/registerProfil', body);
  }
 
  registerCompany (body){
    return this.http.post('http://localhost:4000/User/registerCompany', body);
  }

  login(body){
    return this.http.post('http://localhost:4000/User/Login', body);
  }

  ReloadToken(email, body){
    return this.http.post(`http://localhost:4000/User/ReloadToken/${email}`,body)
  }
  setToken(token){
    localStorage.setItem('token', token);
  }
  decodeToken(){
    let helper = new JwtHelperService();
    let decode = localStorage.getItem('token');
    if (decode){
      let token = helper.decodeToken(decode);
      return token.data
    }
    return null;
  }
  verifToken()
  {
    let decode = localStorage.getItem('token');
    let helper = new JwtHelperService();
    return helper.isTokenExpired(decode);
  }
}
