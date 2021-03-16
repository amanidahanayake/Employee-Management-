import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';



const routes: Routes = [
  { path:'department',component:DepartmentComponent },
  { path:'employee-details',component:EmployeeDetailsComponent },
  { path: '', redirectTo: '/employee-details', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DepartmentComponent, EmployeeDetailsComponent]
