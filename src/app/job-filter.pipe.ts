import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobFilter'
})
export class JobFilterPipe implements PipeTransform {

  transform(jobs: any[], checkSeach: any) {
    console.log(checkSeach)
    if (!jobs || !checkSeach){
      return jobs;
    }
    if (checkSeach === null || checkSeach === undefined || checkSeach.length=== 0){
      return jobs;
    }

    Array.prototype['equals']= function(array){
      if(!array){
        return false;
      }
      for (let i=0; i<this.length; i++){
        if(array.includes(this[i])){
          return true;
        }
      }
      return false;
    }

    return jobs.filter(job => {
      let jobTime;let jobType;
      if(checkSeach.jobTime.length > 0){
        jobTime = job.time_job.equals(checkSeach.jobTime);
      }else{
        jobTime = true;
      }
      if(checkSeach.jobType.length > 0){
        jobType = job.type_job.equals(checkSeach.jobType);
      }else{
        jobType = true;
      }
     return (jobTime && jobType);

      
    })


    //   let jobTime = [];
    //   jobs.forEach(function(job){
    //   checkSeach.forEach(function(value){
    //     if(job.time_job.includes(value)){
    //     console.log('test')
    //     jobTime.push(job);
    //     return true;
    //   }
    //   })
    // })
    //  return jobTime;


        

  }
  

}
