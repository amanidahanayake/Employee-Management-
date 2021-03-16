import { Injectable } from '@angular/core';
import { EmployeeDetail } from './employee-detail.model';
import { HttpClient } from "@angular/common/http";
import { Subject, Subscriber } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {

  EmployeeDetail(){
    throw new Error ('method not implemented')
  }

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44336/api/EmployeeDetail';
  formData: EmployeeDetail = new EmployeeDetail();

  list: EmployeeDetail[];

  Trigger: Subject<any>
  Loaded: boolean;
  table: DataTableDirective;

  postEmployeeDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  putEmployeeDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.Id}`, this.formData);
  }

  deleteEmployeeDetail(Id: number) {
    return this.http.delete(`${this.baseURL}/${Id}`);
  }


  refreshList() {
    this.http.get(this.baseURL)
    .subscribe(data=>{
      this.list=data as EmployeeDetail[]
      if(!this.Loaded){
        this.Trigger.next()
        this.Loaded=true
      }
      else{
        this.table.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();  
          this.Trigger.next(); 
       });
      }
    })
  }
}

