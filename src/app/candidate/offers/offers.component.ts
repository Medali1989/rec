import { Component, OnInit, ViewChild } from '@angular/core';
import { Control } from '../../control';
import { MatSort, MatTableDataSource} from '@angular/material';
import { CompanyApiService } from '../../company-api.service';
import { ProfilApiService } from '../../profil-api.service';
import { JobApiService } from '../../job-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { JobFilterPipe } from 'src/app/job-filter.pipe';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {  
  
  isChecked: any;
  dataSource: MatTableDataSource<any>;

  constructor(private jas : JobApiService, private router : Router) {  
    this.isChecked = {jobTime:[], jobType: []}     
  }
  ngOnInit() {
    this.jas.GetAllJobs().subscribe((res : any) => {   
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.filterPredicate = (data, filter) => {
        const filterObject = filter.trim().toLowerCase();
        const listAsFlatString = (obj): string => {
          let returnVal = '';
          Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') {
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) {
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });
    return returnVal.trim().toLowerCase();
  };
           return listAsFlatString(data).includes(filterObject);
        };
    });
  }
  removeFakePathUrl(f) {     
    if(f)   {
      return f.slice(12, f.length); 
    }  
  }
 
pipeFilter(checked: boolean,filterValue: string, type:string){
  if(checked){
    this.isChecked[type].push(filterValue);
  }
  else{
    const index = this.isChecked[type].indexOf(filterValue, 1)
    this.isChecked[type].splice(index, 1);
  }
  const p = new JobFilterPipe()
  this.dataSource.filteredData = p .transform(this.dataSource.data, this.isChecked)
  console.log(this.isChecked)
}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource)
  }
  setjob(id){
    this.router.navigate(['/JobDetail', id]);
  }
}
