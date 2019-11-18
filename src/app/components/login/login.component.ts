import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { switchViews } from "src/app/animations/switch-views.animation";
import { ApiService } from "src/app/services/api.service";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { DynamicContentService } from "src/app/services/dynamic-content.service";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss", "../user-form/form.scss"],
  animations: [switchViews]
})
export class LoginComponent implements OnInit, AfterViewInit {
  // @ViewChild("form", { read: ViewContainerRef, static: false }) form;
  public state: string = "login";
  public active: boolean = false;
  public name: string;
  public control: FormControl = new FormControl("", Validators.required);
  public errorMessage: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private router: Router,
    private dynamicContentService: DynamicContentService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.state = "left";
    this.cdr.detectChanges();
  }

  public goToPassword() {
    this.name = this.control.value;
    if (this.name) {
      this.state = "right";
      this.control.setValue("");
    }
  }

  public goToLogin() {
    this.control.setValue("");
    this.errorMessage = "";
    this.state = "left";
  }

  public login(name, password) {
    if (this.control.valid) {
      this.dynamicContentService.loadComponent(LoadingComponent);
      this.apiService
        .login(this.name, this.control.value)
        .pipe(
          tap(user => {
            this.dynamicContentService.clearContainer();
            if (!user.errorMessage) {
              this.errorMessage = "";
              localStorage.setItem("user", JSON.stringify(user));
              return this.router.navigate(["/account"]);
            }
            this.errorMessage = user.errorMessage;
          })
        )
        .subscribe();
    }
  }
}
