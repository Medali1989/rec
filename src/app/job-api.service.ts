import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobApiService {

  constructor(private http:HttpClient) { }

   GetJobById(id){
    return this.http.get(`http://localhost:4000/Offre/GetOffreById/${id}`);
  }

  UpdateJob(id, body){    
    let header = new HttpHeaders().append('Authorization','Bearer ' + localStorage.getItem('token'))
    return this.http.post(`http://localhost:4000/Offre/UpdateOffre/${id}`, body,{headers:header});
  }

  GetAllJobs(){
    return this.http.get('http://localhost:4000/Offre/GetAllOffr');
  }

  ApplyOffre(idj,idp,body){
    let header = new HttpHeaders().append('Authorization','Bearer ' + localStorage.getItem('token'));
    return this.http.post(`http://localhost:4000/Offre/ApplyOffre/${idp}/${idj}`, body,{headers:header});
  }
}
