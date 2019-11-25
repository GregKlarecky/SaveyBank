import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { IUser } from "src/app/interfaces/user.interface";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss", "./form.scss"]
})
export class UserFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<IUser> = new EventEmitter();
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
    if (this.profileForm.valid) {
      this.formSubmit.emit(this.profileForm.value);
    }
  }
}
