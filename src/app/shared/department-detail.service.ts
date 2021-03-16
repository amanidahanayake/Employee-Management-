import { Injectable } from '@angular/core';
import { DepartmentDetail } from './department-detail.model';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Injectable({
  providedIn: 'root'
})
export class DepartmentDetailService {

  Department(){
    throw new Error ('method not implemented')
  }

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44336/api/Department';
  formData: DepartmentDetail = new DepartmentDetail();

  list: DepartmentDetail[];
  
  Trigger: Subject<any>
  Loaded: boolean;
  table: DataTableDirective;



  postDepartmentDetail() {
    console.log(this.formData)
    return this.http.post(this.baseURL, this.formData);
  }

  putDepartmentDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.DepId}`, this.formData);
  }

  deleteDepartmentDetail(DepId: number) {
    return this.http.delete(`${this.baseURL}/${DepId}`);
  }
  
  getdata():Observable<any>{
    return this.http.get(this.baseURL)
  }

  refreshList() {
    this.http.get(this.baseURL)
    .subscribe(data=>{
      this.list=data as DepartmentDetail[]
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
