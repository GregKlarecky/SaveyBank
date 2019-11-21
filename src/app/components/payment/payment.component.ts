import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { IPayment } from "src/app/interfaces/payment.interface";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit {
  public errorMessage: string;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  public onformSubmit($event: IPayment) {
    this.apiService.createPaymentAndGetUser($event).subscribe(null, error => {
      this.errorMessage = "Nie udało się stworzyć płatności";
    });
  }
}
