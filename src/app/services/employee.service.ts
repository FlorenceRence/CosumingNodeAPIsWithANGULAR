import { Injectable } from "@angular/core";
import { VERSION } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs"; //angular 6, before import { Observable } from 'rxjs/Observable';
import { Employees } from "../models/employees";
import { catchError, map, tap } from "rxjs/operators"; //angular 6, before import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  HEADERS: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" }) //angular 6
export class EmployeeService {
  url = "api/books"; //this is the right format
  employeeUrl = "http://localhost:6000/employees";

  constructor(private http: Http) {}

  getEmployees(): Observable<Employees[]> {
    //angular 6, You can use the new pipe () method
    return this.http.get(this.employeeUrl).pipe(
      map((response: any) => response.json()),
      catchError((error: any) =>
        Observable.throw(error.json().error || "Server error")
      )
    );
  }
  getEmployeeById(employeeId: string): Observable<Employees> {
    return this.http.get(this.employeeUrl + "/" + employeeId).pipe(
      map(this.extractData),
      catchError((error: any) =>
        Observable.throw(error.json().error || "Server error")
      )
    );
  }
  deleteEmployeeById(employeeId: string): Observable<number> {
    return this.http.delete(this.employeeUrl + "/" + employeeId).pipe(
      map(success => success.status),
      catchError((error: any) =>
        Observable.throw(error.json().error || "Server error")
      )
    );
  }
  updateEmployee(emp: Employees): Observable<Employees> {
    const myObj = {
      EmpID: emp.EmpID,
      Name: emp.Name,
      EmpCode: emp.EmpCode,
      Salary: emp.Salary
    };
    let cpHeaders = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.employeeUrl, myObj, options).pipe(
      map(this.extractData),
      catchError((error: any) =>
        Observable.throw(error.json().error || "Server error")
      )
    );
  }
  //remeber: Observable<Employees> can be Observable<number> but you cant return Employees in the app.component.ts
  addEmployee(employee: Employees): Observable<Employees> {
    const myObj = {
      EmpID: 0,
      Name: employee.Name,
      EmpCode: employee.EmpCode,
      Salary: employee.Salary
    };
    //let body = JSON.stringify(myObj);
    //remeber: Observable<Employees> are responsible for the data inside map(this.extractData)
    //but map(success => success.status) cant be in the Observable<number>
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.employeeUrl, myObj, options).pipe(
      map(this.extractData),
      catchError((error: any) =>
        Observable.throw(error.json().error || "Server error")
      )
    );
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}

http: console.log(VERSION.full);
//npm install @angular/http@latest
//npm install --save rxjs-compat
//install the above library when getting error in importing
