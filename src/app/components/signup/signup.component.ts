import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { IUser } from "src/app/interfaces/user.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public errorMessage: string;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  public onformSubmit($event: IUser) {
    this.apiService.signup($event).subscribe(user => {
      if (!user.errorMessage) {
        this.errorMessage = "";
        localStorage.setItem("user", JSON.stringify(user));
        return this.router.navigate(["/account"]);
      }
      this.errorMessage = user.errorMessage;
    });
  }
}
