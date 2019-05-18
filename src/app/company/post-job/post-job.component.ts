import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from '../../company-api.service';
import { FormGroup,FormGroupDirective, Validators,NgForm, FormArray, FormControl} from '@angular/forms';
import { Control } from '../../control';
import { JwtHelperService } from '@auth0/angular-jwt';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

export interface Skill {
  name: string;
}
@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})

export class PostJobComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: FormArray;
 
  decode;
  token;
  helper = new JwtHelperService();
  job : FormGroup;
  
  company_id;
  constructor(private cas : CompanyApiService) {
    this.job = new FormGroup({
      post : new FormControl('',[Validators.required]),
      type_job : new FormControl('',[Validators.required]),
      time_job : new FormControl('',[Validators.required]),
      job_description : new FormControl('',[Validators.required]),
      skills : new FormArray([])
    });
    this.decode = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.decode);
    this.company_id = this.token.data.company;
   }

  ngOnInit() {
  }

  PostOffre(id, body){
    
    this.cas.PostJob(id, body).subscribe(res => {
      console.log(res);
    })
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our skill
    if ((value || '').trim()) {
      this.skills = this.job.get('skills') as FormArray;
      const form = new FormGroup({skill: new FormControl(value)})
      this.skills.push(form)
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(index): void {
    this.skills = this.job.get('skills') as FormArray;
    if (index >= 0) {
      this.skills.removeAt(index);
    }
  }
}
