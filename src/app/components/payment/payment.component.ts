import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { IPayment } from "src/app/interfaces/payment.interface";
import { DynamicContentService } from "src/app/services/dynamic-content.service";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit {
  public errorMessage: string;
  constructor(
    private apiService: ApiService,
    private dynamicContentService: DynamicContentService
  ) {}

  ngOnInit() {}

  public onformSubmit($event: IPayment) {
    this.dynamicContentService.loadComponent(LoadingComponent);
    this.apiService.createPaymentAndGetUser($event).subscribe(
      () => {
        this.dynamicContentService.clearContainer();
      },
      error => {
        this.dynamicContentService.clearContainer();
        this.errorMessage = "Nie udało się stworzyć płatności";
      }
    );
  }
}
