import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilApiService {

  constructor(private http : HttpClient) { }

  GetProfilById(id){
    let header = new HttpHeaders().append('Authorization','Bearer ' + localStorage.getItem('token'))
    return this.http.get(`http://localhost:4000/Profil/getProfil/${id}`,{headers:header});
  }
}
