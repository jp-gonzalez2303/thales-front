import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private REST_API_SERVER = "http://localhost:8080";

  private EMPLOYEE = "/employee/"; 
  constructor(private httpClient: HttpClient) { }

  public getEmployees() {
    return this.httpClient.get(this.REST_API_SERVER + this.EMPLOYEE);
  }

  public getEmployeeById(id: string) {
    return this.httpClient.get(this.REST_API_SERVER + this.EMPLOYEE  + id);
  }

}
