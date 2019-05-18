import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserApiService } from '../user-api.service';
import { FormGroup,FormGroupDirective, Validators,NgForm, FormArray, FormControl} from '@angular/forms';
import { Control } from '../control';
import { CompanyApiService }  from '../company-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  exist;
  Company : FormGroup;
  
  constructor(private Auth : AuthService, private uas : UserApiService, private cap : CompanyApiService, private route : Router) {
    this.Company = new FormGroup({
      nameCompany : new FormControl('',[Validators.required]),
      adress : new FormControl('',[Validators.required]),
      otherAdress : new FormControl(''),
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(8)]),
      passwordv : new FormControl('',[Validators.required, Validators.minLength(8)]),
      phone : new FormControl('',[Validators.minLength(8),Validators.maxLength(8)]),
      size : new FormControl('',[Validators.required]),
      logo : new FormControl(''),
      website : new FormControl('',),
      facebook : new FormControl(''),
      linkedin : new FormControl(''),
    })
   }

  ngOnInit() {
  }

  Register(form){

    this.uas.GetUserEmail(form.value.email).subscribe(res => {
      if(res){
        if(form.value.password == form.value.passwordv){
     
          this.Auth.registerCompany(form.value).subscribe(res => {
            alert('Welcome :)');
            this.route.navigateByUrl('/Login');
          });     
      }
      else{
        alert('Wrong password!!')
      }
      }
      else{
        alert('Email already exist!!');
      }
    })
  }

  existt (){
    this.uas.GetUserEmail(this.Company.value.email).subscribe(res => {
      
      this.exist = res;
      if(this.exist === false){
        this.Company.controls.email.setErrors({valid : false})
      }
      
    })}

  passwordExist(){
    if (this.Company.value.password != this.Company.value.passwordv){
      this.Company.controls.passwordv.setErrors({validd : false});          
    }
  }
  fakePath;
  fileUpload;
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  uploadFile() {
    const fba = new FormData();
    fba.append('file', this.fileUpload[0]);
    this.cap.UploadImg(fba).subscribe(res => {
    });
  }
  filechangeEvent(fileInput: any) {
    this.fileUpload = <Array<File>>fileInput.target.files;
  }
}
