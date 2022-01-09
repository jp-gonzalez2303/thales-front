import { Component, OnInit } from '@angular/core';
import { EmployeeDto } from '../models/employee-dto';

import { DataService } from '../data.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  id: string = "";
  constructor(private dataService: DataService) { }

  columns = ["Employee Id ", "Name ", "Salary ", "Age ", "Profile Image ", "Anual Salary "];
  employees: EmployeeDto[] = [];
  ngOnInit() {

    this.dataService.getEmployees().subscribe((data: any) => {
      console.log(data);
      this.employees = data.data;
    })
  }


  public findById() {
    console.log(this.id);
    if (this.id == "") {
      this.dataService.getEmployees().subscribe((data: any) => {
        console.log(data);
        this.employees = data.data;
      })
    }

    this.dataService.getEmployeeById(this.id).subscribe((data: any) => {
      console.log(data);
      this.employees = [];
      if(data.data!=null){
        this.employees.push(data.data);
      }else{
        alert(data.message);
      }
    })
  }



}
