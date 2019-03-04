import { Injectable } from "@angular/core";
import { VERSION } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { catchError, map, tap } from "rxjs/operators";
@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getUsers(): Observable<User[]> {
    return this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
      map((response: any) => response.json()),
      catchError((error: any) =>
        Observable.throw(error.json().error || "Server error")
      )
    );
  }
}

http: console.log(VERSION.full);
//npm install @angular/http@latest
//npm install --save rxjs-compat
//install the above library when getting error in importing

// getUsers(): Observable<User[]> {
//     return this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
//       map((response: any) => response.json()),
//       catchError((error: any) =>
//         Observable.throw(error.json().error || "Server error")
//       )
//     );
//   }
