import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { switchViews } from "src/app/animations/switch-views.animation";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [switchViews]
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("form", { read: ViewContainerRef, static: false }) form;
  @ViewChild("name", { static: false }) name;
  @ViewChild("password", { static: false }) password;
  public state: string = "login";
  public template: any;
  public control: FormControl = new FormControl();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.state = "left";
    this.template = this.name;
    this.cdr.detectChanges();
  }

  add() {
    if (this.template === this.name) {
      this.goToPassword();
    } else {
      this.goToLogin();
    }
  }

  public goToPassword() {
    this.state = "right";
    this.template = this.password;
  }

  public goToLogin() {
    this.state = "left";
    this.template = this.name;
  }
}
