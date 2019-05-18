import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http:HttpClient) { 
    
  }
  GetUserEmail ( email){
    return this.http.get(`http://localhost:4000/User/Getbyemail/${email}`);
  }
}
