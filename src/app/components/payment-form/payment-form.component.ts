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
    accountNumber: ["", Validators.required],
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
}
