import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  authenticationPages: string[] = ["login", "signup"];

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (localStorage.getItem("user")) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
