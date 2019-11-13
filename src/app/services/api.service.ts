import { Injectable } from "@angular/core";
import { domain } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
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
      "Content-Type": "application/json"
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
        Authorization: this.getToken()
      })
    };
  }

  // TODO put token to httpOptions
  public logout() {
    const httpOptions = this.setAuthorization();
    return this.http.post<any>(domain + `users/logout`, httpOptions).pipe(
      catchError(error => {
        return of({ errorMessage: "Unable to logout" });
      })
    );
  }

  // TODO put token to httpOptions
  public logoutAll() {
    const httpOptions = this.setAuthorization();
    return this.http.post<any>(domain + `users/logoutAll`, httpOptions).pipe(
      catchError(error => {
        return of({ errorMessage: "Unable to logout" });
      })
    );
  }

  public getUser() {
    const httpOptions = this.setAuthorization();
    return this.http.get<any>(domain + `users/me`, httpOptions).pipe(
      catchError(error => {
        return of({ errorMessage: "Unable to get information abut user" });
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
    return this.http
      .post<any>(domain + `payments`, { ...payment }, httpOptions)
      .pipe(
        catchError(error => {
          return of({ errorMessage: "Unable to create payment" });
        })
      );
  }

  public getPayments(pageSize?: number) {
    const httpOptions = this.setAuthorization();
    console.log(httpOptions);
    const pageQuery: string = pageSize ? `?pageSize=${pageSize}` : "";
    return this.http
      .get<any>(domain + `payments${pageQuery}`, httpOptions)
      .pipe(
        catchError(error => {
          return of({ errorMessage: "Unable to retrieve user's payments" });
        })
      );
  }

  public getPaymentById(id: string) {
    const httpOptions = this.setAuthorization();
    return this.http.get<any>(domain + `payments/${id}`, httpOptions).pipe(
      catchError(error => {
        return of({ errorMessage: "Unable to retrieve payment by id" });
      })
    );
  }
}
