import { Injectable } from "@angular/core";
import { domain } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { of } from "rxjs";
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
}
