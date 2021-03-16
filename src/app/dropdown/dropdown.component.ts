import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DepartmentDetail } from 'src/app/shared/department-detail.model';
import { DepartmentDetailService } from '../shared/department-detail.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  depart: DepartmentDetail[]

  constructor(public Service: DepartmentDetailService, private http: HttpClient) { }

  ngOnInit() {
    this.Service.getdata()
      .subscribe(data => {
        this.depart = data
      })
  }


}
