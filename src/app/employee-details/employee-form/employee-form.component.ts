import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from 'src/app/shared/employee-detail.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { EmployeeDetail } from 'src/app/shared/employee-detail.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: [
  ]
})
export class EmployeeFormComponent implements OnInit {

  constructor(public service: EmployeeDetailService) { }
  ccc;

  type;

  cc(value) {
    this.service.formData.MaritalStatus = value === 'Married' ? true : false;
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);

  }
  insertRecord(form: NgForm) {
    this.service.postEmployeeDetail()
      .subscribe(
        res => {
          this.resetForm(form);
          this.service.refreshList()
          alert("Inserted successfully")
        },
        err => {
          console.log(err);
          alert(" Insert Error")
        }
      );

  }

  updateRecord(form: NgForm) {
    this.service.putEmployeeDetail().subscribe(
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
    this.service.formData = new EmployeeDetail();
  }
}
