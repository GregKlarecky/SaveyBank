import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { IPayment } from "src/app/interfaces/payment.interface";
import { IUser } from "src/app/interfaces/user.interface";
import { PaymentListComponent } from "../payment-list/payment-list.component";
import { emptyList } from "./empty-list.mock";
import { UserService } from "src/app/services/user.service";
import { Subscription } from "rxjs";
PaymentListComponent;

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss", "../payment-list/desktop-list.scss"]
})
export class AccountComponent implements OnInit, OnDestroy {
  public payments: IPayment[] = emptyList;
  public errorMessage: string;
  public user: IUser;
  public userSubsription: Subscription;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getPayments(5);
    this.getUser();
  }

  public getPayments(pageSize: number) {
    this.apiService.getPayments(pageSize).subscribe(
      (payments: IPayment[]) => {
        this.errorMessage = "";
        this.payments = payments;
      },
      error => {
        this.errorMessage = "Couldn't get payments from the server";
      }
    );
  }

  public getUser() {
    this.userSubsription = this.userService.user.subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy() {
    this.userSubsription.unsubscribe();
  }
}
