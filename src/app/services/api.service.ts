import { Injectable } from "@angular/core";
import { domain } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, mergeMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { IUser } from "../interfaces/user.interface";
import { IPayment } from "../interfaces/payment.interface";
// import { of } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

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
    return this.http.post<any>(domain + `users/logout`, null, httpOptions);
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
    return this.http.get<any>(domain + `users/me`, httpOptions);
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

  public getPayments(pageSize?: number) {
    const httpOptions = this.setAuthorization();
    console.log(httpOptions);
    const pageQuery: string = pageSize ? `?pageSize=${pageSize}` : "";
    return this.http.get<any>(domain + `payments${pageQuery}`, httpOptions);
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
            this.updatedStoredUser(user);
            this.router.navigate(["/account"]);
          })
        )
      )
    );
  }

  public updatedStoredUser(user) {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: savedUser.token,
        user: { ...savedUser.user, ...user }
      })
    );
  }

  public isLoggedin() {
    return localStorage.getItem("user");
  }
}
