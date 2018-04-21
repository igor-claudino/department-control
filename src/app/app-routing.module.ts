import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentNewComponent } from './department-new/department-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/departments', pathMatch:'full' },
  { path: 'users', component: UsersComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'department-new', component: DepartmentNewComponent },
  { path: 'department-detail/:id', component: DepartmentDetailComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
