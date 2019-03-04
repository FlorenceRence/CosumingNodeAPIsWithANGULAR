import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../services/employee.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Employees } from "../models/employees";
import { Location } from "@angular/common";

@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.css"]
})
export class AdduserComponent implements OnInit {
  employeeIdToUpdate = null;
  //employeeIdToSave = true;
  processValidation = false;
  //enableEdit: boolean = false;
  statusCode: number;
  errorMessage: String;
  employee = new Employees();
  //employeePass: any;

  employeeForm = new FormGroup({
    empid: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    empcode: new FormControl("", Validators.required),
    salary: new FormControl("", Validators.required)
  });
  onEmployeeFormSubmit() {
    this.processValidation = true;
    if (this.employeeForm.invalid) {
      return; //Validation failed, exit from method.
    }
  }

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.employeeService.getEmployeeById(params.get("id")).subscribe(
        emp => {
          ////FOR THE MYSQL NODEJS
          // this.employeeIdToUpdate = emp[0].EmpID;
          // this.employeeForm.setValue({
          //   empid: emp[0].EmpID,
          //   name: emp[0].Name,
          //   empcode: emp[0].EmpCode,
          //   salary: emp[0].Salary
          ////FOR THE MONGODB NODEJS
          this.employeeIdToUpdate = emp.EmpID;
          this.employeeForm.setValue({
            empid: emp.EmpID,
            name: emp.Name,
            empcode: emp.EmpCode,
            salary: emp.Salary
          });
        },
        errorCode => (this.statusCode = errorCode)
      );
    });
  }

  update(): void {
    this.employeeService.updateEmployee(this.employee).subscribe(() => {
      this.reset();
    });
    error => (this.errorMessage = <any>error);
  }

  add(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
      emp => {
        this.reset();
      },
      error => (this.errorMessage = <any>error)
    );
  }

  goBack() {
    this.location.back();
  }

  private reset() {
    this.employee.EmpID = null;
    this.employee.Name = null;
    this.employee.EmpCode = null;
    this.employee.Salary = null;
  }
}
