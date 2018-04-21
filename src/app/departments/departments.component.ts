import { Component, OnInit } from '@angular/core';

import { Department } from '../entities/department';
import { DepartmentService } from '../services/department.service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['../app.component.css']
})
export class DepartmentsComponent implements OnInit {

  selectedDepartment: Department;
  users : User[];

  departments: Department[];

  constructor(
    private departmentService: DepartmentService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getDepartments();
    this.getAllUsers();
  }

  loadDepartment(department: Department) {
    this.selectedDepartment = Object.assign(new Department(), department);
    this.getUsersByDepartment(this.selectedDepartment.getId());
  }

  getDepartments() {
    this.departmentService.getDepartments()
      .subscribe(departments => this.departments = departments);
  }

  getUsersByDepartment(id: number) {
    this.departmentService.getUsersByDepartment(id)
      .subscribe(users => this.selectedDepartment.setUsers(users));
  }

  deleteDepartment(department: Department) {
    department = Object.assign(new Department(), department);
    this.departmentService.deleteDepartment(department)
      .subscribe(() => this.getDepartments());
  }

  addUserInDepartment(user: User){
    user = Object.assign(new User(), user);
    this.departmentService.addUserInDepartment(this.selectedDepartment.getId(), user)
    .subscribe(() => this.getUsersByDepartment(this.selectedDepartment.getId()));
  }

  getAllUsers() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  search(departmentName : string){
    this.departmentService.searchByName(departmentName)
    .subscribe(departments => this.departments = departments);
  }

}
