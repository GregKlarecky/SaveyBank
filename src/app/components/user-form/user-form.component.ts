import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss", "./form.scss"]
})
export class UserFormComponent implements OnInit {
  profileForm = this.fb.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  get firstname() {
    return this.profileForm.get("firstname");
  }
  get lastname() {
    return this.profileForm.get("lastname");
  }
  get email() {
    return this.profileForm.get("email");
  }
  get password() {
    return this.profileForm.get("password");
  }

  ngOnInit() {}

  public signUp() {
    console.log("dwdwdw");
  }
}
