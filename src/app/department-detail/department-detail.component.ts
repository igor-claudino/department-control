import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Department } from '../entities/department';
import {DepartmentService} from '../services/department.service';



@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['../app.component.css']
})
export class DepartmentDetailComponent implements OnInit {

  department : Department = new Department();

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getDepartment();
  }

  getDepartment(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.departmentService.getDepartment(id)
      .subscribe(department => this.department = department);
  }

  goBack(): void {
    this.location.back();
  }

  editDepartment(){
    this.departmentService.editDepartment(this.department).subscribe(() => this.goBack());
  }

}
