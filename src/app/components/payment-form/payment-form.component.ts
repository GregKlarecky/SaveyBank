import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { IUser } from "src/app/interfaces/user.interface";

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
    reference: [""]
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
      // const date = formatDate(new Date(), "H:mm d.LL.y", "en-US");
      const date = new Date().getTime();
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

  public isAllowedCharacter($event: any, characters: any[]) {
    let char = characters.find(char => char === $event.keyCode);
    return char ? true : false;
  }

  public onAmountInput($event) {
    let allowedCharacters = !this.amount.value.includes(".") ? [46, 44] : [];

    if (
      (this.isNotNumber($event) &&
        !this.isAllowedCharacter($event, allowedCharacters)) ||
      this.amount.value.match(/\.\w{2}/g)
    ) {
      $event.preventDefault();
    }

    if (this.amount.value.includes(",")) {
      this.amount.setValue(this.amount.value.replace(",", "."));
    }
  }
}
