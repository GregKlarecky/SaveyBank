import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { IUser } from "src/app/interfaces/user.interface";
import { Router } from "@angular/router";
import { DynamicContentService } from "src/app/services/dynamic-content.service";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public errorMessage: string;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private dynamicContentService: DynamicContentService
  ) {}

  ngOnInit() {}

  public onformSubmit($event: IUser) {
    this.dynamicContentService.loadComponent(LoadingComponent);
    this.apiService.signup($event).subscribe(user => {
      this.dynamicContentService.clearContainer();
      if (!user.errorMessage) {
        this.errorMessage = "";
        localStorage.setItem("user", JSON.stringify(user));
        return this.router.navigate(["/account"]);
      }
      this.errorMessage = user.errorMessage;
    });
  }
}
