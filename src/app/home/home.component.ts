import { Component, OnInit, Input } from "@angular/core";
import { EmployeeService } from "../services/employee.service";
import { Employees } from "../models/employees";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  processValidation = false;
  statusCode: number;
  // requestProcessing = false;
  employeeIdToUpdate = null;
  title = "app works!";
  //users;
  //employees; //use this when using Get in constructor
  employeesArray: Employees[]; //first create, use in the fetchBooks
  employee = new Employees(); //second create,, use in the fetchBooks
  errorMessage: String; //third create
  //employeeName: String; //fourth create
  // constructor(private userService: UserService) {
  //   this.users = userService.getUsers();
  // }
  constructor(private employeeService: EmployeeService) {
    //this.employees = employeeService.getEmployees();
  } //I think if you put the fetchEmployees/getEmployees here the parameter is not gonna be dynamic,
  //so its best to put it in the ngOnInit, but first implements OnInit it in the export class

  //Create form
  employeeForm = new FormGroup({
    empid: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    empcode: new FormControl("", Validators.required),
    salary: new FormControl("", Validators.required)
  });
  //Handle create and update article
  onEmployeeFormSubmit() {
    this.processValidation = true;
    if (this.employeeForm.invalid) {
      return; //Validation failed, exit from method.
    }
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe(
        employeesArray => (this.employeesArray = employeesArray),
        error => (this.errorMessage = <any>error)
      );
  }
  //Perform preliminary processing configurations
  // preProcessConfigurations() {
  //   this.statusCode = null;
  //   this.requestProcessing = true;
  // }
  // loadEmployeeToEdit(empId: string) {
  //   //this.preProcessConfigurations();
  //   this.employeeService.getEmployeeById(empId).subscribe(
  //     emp => {
  //       this.employeeIdToUpdate = emp.EmpID; //I add value to this so that , in *ngIf the button UPDATE will show
  //       this.employeeForm.setValue({
  //         empid: emp.EmpID,
  //         name: emp.Name,
  //         empcode: emp.EmpCode,
  //         salary: emp.Salary
  //       }); //emp gets the value of Employees, coz of the getEmployeeId then subscribe the OBSERVABLE<EMPLOYEES> in the employee.serveice.ts
  //       // this.processValidation = true;
  //       // this.requestProcessing = false;
  //     },
  //     errorCode => (this.statusCode = errorCode)
  //   );
  // }
  delete(empId: string): void {
    //this.heroes = this.heroes.filter(h => h !== hero);
    this.employeeService.deleteEmployeeById(empId).subscribe(
      () => {
        this.fetchEmployees(); //you can right this with return
      },
      error => (this.errorMessage = <any>error)
    );
  }
  add(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
      emp => {
        // this.fetchEmployees();
        // this.reset();
        //this.employeeName = emp.Name;
      },
      error => (this.errorMessage = <any>error)
    );
  } //this is callback arrow function ()=> ,I make it employee=> this.employeeName = employee.Name
  //to initialize/pass THIS and employee.Name, callBack coz after employee it will execute the arrow
  update(): void {
    this.employeeService.updateEmployee(this.employee).subscribe(() => {
      this.fetchEmployees();
      // this.reset();
    });
    error => (this.errorMessage = <any>error);
  }

  private reset() {
    this.employee.EmpID = "";
    this.employee.Name = "";
    this.employee.EmpCode = null;
    this.employee.Salary = null;
    this.errorMessage = null;
    //this.employeeName = null;
  }
}
