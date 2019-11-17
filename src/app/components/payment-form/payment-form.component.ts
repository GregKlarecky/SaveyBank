import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { IUser } from "src/app/interfaces/user.interface";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-payment-form",
  templateUrl: "./payment-form.component.html",
  styleUrls: ["./payment-form.component.scss", "../user-form/form.scss"]
})
export class PaymentFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<IUser> = new EventEmitter();
  paymentForm = this.fb.group({
    recipient: ["", Validators.required],
    accountNumber: ["", [Validators.required, Validators.minLength(32)]],
    amount: ["", Validators.required],
    reference: ["", Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  get recipient() {
    return this.paymentForm.get("recipient");
  }
  get accountNumber() {
    return this.paymentForm.get("accountNumber");
  }
  get amount() {
    return this.paymentForm.get("amount");
  }
  get reference() {
    return this.paymentForm.get("reference");
  }

  ngOnInit() {}

  public pay() {
    if (this.paymentForm.valid) {
      const date = formatDate(new Date(), "H:mm d.LL.y", "en-US");
      const payload = {
        ...this.paymentForm.value,
        date
      };
      this.formSubmit.emit(payload);
    }
  }

  public isNotNumber($event) {
    return $event.keyCode > 57 || $event.keyCode < 48;
  }

  public preventTyping($event) {
    const value = Array.from(this.accountNumber.value);

    if (value.length >= 32 || this.isNotNumber($event)) {
      $event.preventDefault();
    }
  }

  public onAccountNumberInput($event) {
    const value = Array.from(this.accountNumber.value);
    if ($event && value.length >= 32) {
      $event.preventDefault();
    }
    value.forEach((letter, i) => {
      if ((i - 2) % 5 === 0 && letter !== " ") {
        value.splice(i, 0, " ");
        this.accountNumber.setValue(value.join(""));
      }
    });
  }
}
