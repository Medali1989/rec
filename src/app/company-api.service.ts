import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {

  constructor(private http:HttpClient) { }

  GetCompanyId (id) {
    let header = new HttpHeaders().append('Authorization','Bearer ' + localStorage.getItem('token'))
    return this.http.get(`http://localhost:4000/Company/getCompany/${id}`,{headers: header});
  }

  PostJob(id, body){
    let header = new HttpHeaders().append('Authorization','Bearer ' + localStorage.getItem('token'))
    return this.http.post(`http://localhost:4000/Company/createOffer/${id}`, body,{headers: header});
  }

  GetJobByCompany(id){
    let header = new HttpHeaders().append('Authorization','Bearer ' + localStorage.getItem('token'))
    return this.http.get(`http://localhost:4000/Company/getOffersByCompany/${id}`,{headers: header});
  }

  UploadImg (file){
    let header = new HttpHeaders().append('Authorization','Bearer ' + localStorage.getItem('token'));
    header.set('Content-Type', 'form-data');
    return this.http.post('http://localhost:4000/Company/upload', file);
  }

  PublishOffre(id, body){
    let header = new HttpHeaders().append('Authorization','Bearer ' + localStorage.getItem('token'));
    return this.http.post(`http://localhost:4000/Company/publishOffer/${id}`, body,{headers:header});
  }
  DeleteJob(id, body){
    let header = new HttpHeaders().append('Authorization','Bearer ' + localStorage.getItem('token'));
    return this.http.post(`http://localhost:4000/Company/deleteOffer/${id}`, body,{headers:header}); 
  }
}
