import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Department } from '../entities/department';
import { DepartmentService } from '../services/department.service';
@Component({
  selector: 'app-department-new',
  templateUrl: './department-new.component.html',
  styleUrls: ['../app.component.css']
})
export class DepartmentNewComponent implements OnInit {

  newDepartment: Department = new Department();

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  addDepartment() {
    this.departmentService.addDepartment(this.newDepartment).subscribe(() => this.goBack());
  }

}
