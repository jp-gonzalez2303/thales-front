import { Component, OnInit } from '@angular/core';
import { EmployeeDto } from '../models/employee-dto';

import { DataService } from '../data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  id: string = "";
  constructor(private dataService: DataService) {

  }
  employees: EmployeeDto[] = [];
  employeesfind: EmployeeDto[] = [];
  columns = ["Employee Id ", "Name ", "Salary ", "Age ", "Profile Image ", "Anual Salary "];
  page = 1;
  pageSize = 4;
  collectionSize: number = this.employees.length;

  ngOnInit() {

    this.refreshEmployees();
    this.dataService.getEmployees().subscribe((data: any) => {
      console.log(data);
      this.employeesfind = data.data;
      this.refreshEmployees();
    })

    this.collectionSize = this.employeesfind.length;
    this.refreshEmployees();
  }

  refreshEmployees() {
    this.collectionSize = this.employeesfind.length;
    console.log('inicio refresco' + this.collectionSize);
    console.log('inicio refresco' + this.employeesfind.length);
    this.employees = this.employeesfind
      .map((employee, i) => ({ ids: i + 1, ...employee }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  public findById() {

    console.log("id: " + this.id);
    if (this.id == "") {
      console.log("consume find All");
      this.dataService.getEmployees().subscribe((data: any) => {
        console.log(data);
        this.employeesfind = data.data;
      })
    }
    else {
      this.dataService.getEmployeeById(this.id).subscribe((data: any) => {
        console.log("");
        this.employees = [];
        if (data.data != null) {
          this.employeesfind.push(data.data);
        } else {
          this.employees = [];
          alert(data.message);
          this.dataService.getEmployees().subscribe((data: any) => {
            console.log(data);
            this.employeesfind = data.data;
          })
        }

      })
    }
    this.refreshEmployees();
  }


}
