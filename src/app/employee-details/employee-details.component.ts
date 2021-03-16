import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { EmployeeDetail } from '../shared/employee-detail.model';
import { EmployeeDetailService } from '../shared/employee-detail.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styles: ['./employee-details.component.html']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  //list:EmployeeDetail[];

  dtTrigger: Subject<any> = new Subject<any>();
  isLoaded: boolean = false;
  @ViewChild(DataTableDirective, {static: false}) dtDirective: DataTableDirective;
  

  constructor(public service: EmployeeDetailService, private http:HttpClient) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu:[5,10,20]
    };

    this.service.Trigger = this.dtTrigger
    this.service.table = this.dtDirective
    this.service.Loaded = this.isLoaded
    

    this.service.refreshList();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  populateForm(selectedRecord: EmployeeDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(Id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.service.deleteEmployeeDetail(Id)
        .subscribe(
          res => {
            this.service.refreshList();
            alert("Deleted Successfully")
          },
          err => { console.log(err) }
        )
  }
}

