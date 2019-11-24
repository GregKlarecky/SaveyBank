import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { IPayment } from "src/app/interfaces/payment.interface";
import {
  faChevronDown,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-payment-list",
  templateUrl: "./payment-list.component.html",
  styleUrls: ["./payment-list.component.scss", "desktop-list.scss"]
})
export class PaymentListComponent implements OnInit {
  public chevronDown = faChevronDown;
  public calendar = faCalendarAlt;
  public payments: IPayment[];
  public errorMessage: string;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPayments().subscribe(
      payments => {
        this.errorMessage = "";
        this.payments = payments;
      },
      error => {
        this.errorMessage = "Couldnt not get payments from the server";
      }
    );
  }
}
