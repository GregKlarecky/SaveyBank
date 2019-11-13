import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { IPayment } from "src/app/interfaces/payment.interface";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  public payments: IPayment[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getPayments(5);
  }

  public getPayments(pageSize: number) {
    this.apiService.getPayments(pageSize).subscribe((payments: IPayment[]) => {
      this.payments = payments;
    });
  }
}
