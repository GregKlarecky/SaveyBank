import { Injectable } from "@angular/core";
import { domain } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, mergeMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { IUser } from "../interfaces/user.interface";
import { IPayment } from "../interfaces/payment.interface";
import { UserService } from "./user.service";
import { QueryBuilder } from "./queryBuilder.helper";
// import { of } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  public httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept"
    })
  };

  public login(email: string, password: string) {
    return this.http
      .post<any>(domain + `users/login`, { email, password }, this.httpOptions)
      .pipe(
        catchError(error => {
          return of({ errorMessage: "Unable to login" });
        })
      );
  }

  public signup(user: IUser) {
    return this.http.post<any>(domain + `users`, user, this.httpOptions).pipe(
      catchError(error => {
        return of({ errorMessage: "Unable to create user" });
      })
    );
  }

  public updateUser(user: IUser) {
    const httpOptions = this.setAuthorization();
    return this.http
      .patch<any>(domain + `users`, { ...user }, httpOptions)
      .pipe(
        catchError(error => {
          return of({ errorMessage: "Unable to update user data" });
        })
      );
  }

  public getToken() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user).token;
    }
    return "";
  }

  public setAuthorization() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${this.getToken()}`
      })
    };
  }

  public logout() {
    const httpOptions = this.setAuthorization();
    return this.http.post<any>(domain + `users/logout`, null, httpOptions).pipe(
      tap(logout => {
        this.router.navigate(["/login"]);
        localStorage.removeItem("user");
        this.userService.user.next(null);
      })
    );
  }

  public logoutAll() {
    const httpOptions = this.setAuthorization();
    return this.http
      .post<any>(domain + `users/logoutAll`, null, httpOptions)
      .pipe(
        catchError(error => {
          return of({ errorMessage: "Unable to logout" });
        })
      );
  }

  public getUser() {
    const httpOptions = this.setAuthorization();
    return this.http.get<any>(domain + `users/me`, httpOptions).pipe(
      tap(user => {
        this.updatedStoredUser(user);
      })
    );
  }

  public deleteUser() {
    const httpOptions = this.setAuthorization();
    return this.http.delete<any>(domain + `users/me`, httpOptions).pipe(
      catchError(error => {
        return of({ errorMessage: "Unable to delete user" });
      })
    );
  }

  public createPayment(payment: IPayment) {
    const httpOptions = this.setAuthorization();
    return this.http.post<any>(domain + `payments`, payment, httpOptions);
  }

  public getPayments(pageSize?: number, dateFrom?: number, dateTo?: number) {
    const httpOptions = this.setAuthorization();
    const queryString = new QueryBuilder(
      pageSize,
      dateFrom,
      dateTo
    ).buildQueryString();
    return this.http.get<any>(domain + `payments${queryString}`, httpOptions);
  }

  public getPaymentById(id: string) {
    const httpOptions = this.setAuthorization();
    return this.http.get<any>(domain + `payments/${id}`, httpOptions).pipe(
      catchError(error => {
        return of({ errorMessage: "Unable to retrieve payment by id" });
      })
    );
  }

  public createPaymentAndGetUser($event) {
    return this.createPayment($event).pipe(
      mergeMap(payment =>
        this.getUser().pipe(
          tap(user => {
            this.router.navigate(["/account"]);
          })
        )
      )
    );
  }

  public updatedStoredUser(user) {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const refactoredUser = {
      token: savedUser.token,
      user: { ...user }
    };
    localStorage.setItem("user", JSON.stringify(refactoredUser));
    this.userService.user.next(refactoredUser);
  }

  public isLoggedin() {
    return localStorage.getItem("user");
  }
}
