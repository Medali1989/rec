import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from '../../company-api.service';
import { FormGroup,FormGroupDirective, Validators,NgForm, FormArray, FormControl} from '@angular/forms';
import { Control } from '../../control';
import { Router, ActivatedRoute } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { AuthService } from '../../auth.service';
import { JobApiService } from '../../job-api.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css','./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: FormArray;
  decode;
  token;
  LocalJob;
  LocalJob2;
  job : FormGroup;
  
  company_id;

  constructor(private dataRoute: ActivatedRoute, private router : Router, private cas : CompanyApiService, private auth : AuthService, private jas : JobApiService) {
    const key: String = this.dataRoute.snapshot.params['id'];
    this.token = this.auth.connectedUser;
    this.job = new FormGroup({
      post : new FormControl('',[Validators.required]),
      type_job : new FormControl('',[Validators.required]),
      time_job : new FormControl('',[Validators.required]),
      job_description : new FormControl('',[Validators.required]),
      skills : new FormArray([])
    });
    this.company_id = this.token.company;
    this.jas.GetJobById(key).subscribe(res => {
      this.LocalJob = res;
    })
   }

  ngOnInit() {
   
    this.jas.GetJobById(localStorage.getItem('job')).subscribe(res => {
      this.LocalJob2 = res;
      this.initSkills();
      const Local =  this.LocalJob2;
       delete Local._id;
       delete Local.__v;
       delete Local.status;
       delete Local.applied_profiles;
       delete Local.owner;
       delete Local.skills;
       Local['skills'] = [];
      this.job.setValue(Local);
    })
  }
  initSkills(){

    for (const skill of this.LocalJob.skills) {
      this.skills = this.job.get('skills') as FormArray;
      const form = new FormGroup({skill: new FormControl(skill.skill)})
      this.skills.push(form)
    }
    
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
  DeleteJob(id, job){
    this.cas.DeleteJob(id, job).subscribe(res => {
      console.log(res);
    })
  }
  UpdateJob(id,body){
    this.jas.UpdateJob(id, body.value).subscribe(res => {      
      this.jas.GetJobById(localStorage.getItem('job')).subscribe(res => {
        this.LocalJob = res;
      })
    })
  }
}
