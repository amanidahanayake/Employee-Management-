import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DepartmentDetail } from '../shared/department-detail.model';
import { DepartmentDetailService } from '../shared/department-detail.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  // list:DepartmentDetail[]

  dtTrigger: Subject<any> = new Subject<any>();
  isLoaded: boolean = false;
  @ViewChild(DataTableDirective, { static: false }) dtDirective: DataTableDirective;

  constructor(public service: DepartmentDetailService, private http: HttpClient) { }

  ngOnInit(): void {


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 20]
    };

    this.service.Trigger = this.dtTrigger
    this.service.table = this.dtDirective
    this.service.Loaded = this.isLoaded

    this.service.refreshList();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.DepId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postDepartmentDetail()
      .subscribe(
        res => {
          this.resetForm(form);
          this.service.refreshList()
          alert("Inserted succesfully")
        },
        err => {
          console.log(err);
          alert("Insert Error")
        }
      );
  }

  updateRecord(form: NgForm) {
    this.service.putDepartmentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList()
        alert("Updated succesfully")
      },
      err => {
        console.log(err);
        alert(" Update Error")
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new DepartmentDetail();
  }


  // Table ...

  populateForm(selectedRecord: DepartmentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(Id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.service.deleteDepartmentDetail(Id)
        .subscribe(
          res => {
            this.service.refreshList();
            alert("Deleted Successfully")
          },
          err => { console.log(err) }
        )
  }

  onSubmittwo(form: NgForm) {
    if (this.service.formData.DepId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);

  }
}

