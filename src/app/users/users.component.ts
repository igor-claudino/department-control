import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../entities/user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../app.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  selectedUser: User = new User;
  editingUser: User = new User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  loadUser(user: User) {
    this.selectedUser = Object.assign({}, user);
  }

  clearFields() {
    this.selectedUser = new User();
  }

  goBack(): void {
    this.location.back();
  }

  addUser() {
    let newUser: User = this.selectedUser;
    this.userService.addUser(newUser).subscribe(() => this.getUsers());
    this.selectedUser = new User();
  }

  editUser() {
    let editedUser: User = this.selectedUser;
    this.userService.editUser(editedUser).subscribe(() => this.getUsers());
    this.selectedUser = new User();
  }

  deleteUser(user: User) {
    user = Object.assign(new User, user);
    this.userService.deleteUser(user).subscribe(() => this.getUsers());
  }

  search(pesq : string){
    this.userService.search(pesq)
    .subscribe(users => this.users = users);
  }

}
