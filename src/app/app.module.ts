import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule} from "angular-datatables";

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeFormComponent } from './employee-details/employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentComponent } from './department/department.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DropdownComponent } from './dropdown/dropdown.component';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    EmployeeFormComponent,
    DepartmentComponent,
    routingComponents,
    NavbarComponent,
    DropdownComponent,
  
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
