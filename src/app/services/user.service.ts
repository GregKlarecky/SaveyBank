import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public user: ReplaySubject<IUser | null> = new ReplaySubject(1);
  constructor() {}
}
