import { Component, OnInit, HostListener } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { IPayment } from "src/app/interfaces/payment.interface";
import {
  faChevronDown,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import { emptyList } from "../account/empty-list.mock";

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
  public selectDateError: string;
  public showDateFrom: boolean;
  public showDateTo: boolean;
  public startDate: number;
  public dateFrom: number;
  public dateTo: number;
  public loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.setTime();
    this.apiService.getPayments().subscribe(
      payments => {
        this.loading = false;
        this.errorMessage = "";
        this.payments = payments;
      },
      error => {
        this.loading = false;
        this.errorMessage = "Could not get payments from the server";
      }
    );
  }

  setTime(daysBack?: number) {
    const date = new Date();
    this.dateTo = date.getTime();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    this.dateFrom = date.getTime();
  }

  public selectDateFrom() {
    this.startDate = this.dateFrom;
    this.showDateFrom = true;
    this.showDateTo = false;
  }
  public selectDateTo() {
    this.startDate = this.dateTo;
    this.showDateFrom = false;
    this.showDateTo = true;
  }

  public onSelectDate($event) {
    this.selectDateError = "";
    this.errorMessage = "";
    if (this.showDateFrom) {
      this.dateFrom = this.setDateFrom($event);
    }

    if (this.showDateTo) {
      this.dateTo = this.setDateTo($event);
    }

    if ((this.dateFrom || this.dateTo) && !this.selectDateError) {
      this.submit();
    }
  }

  public setDateFrom($event) {
    this.showDateFrom = false;
    const dateFrom = new Date($event.year, $event.month, $event.day).getTime();
    if (dateFrom > this.dateTo) {
      this.selectDateError = "Cannot select start date after end date";
      return this.dateTo;
    }
    return dateFrom;
  }

  public setDateTo($event) {
    this.showDateTo = false;
    const dateTo = new Date(
      $event.year,
      $event.month,
      $event.day,
      23,
      59,
      59
    ).getTime();

    if (dateTo < this.dateFrom) {
      this.selectDateError = "Cannot select end date before start date";
      return this.dateFrom;
    }
    return dateTo;
  }

  public onClose($event) {
    this.showDateFrom = false;
    this.showDateTo = false;
  }

  public submit() {
    this.loading = true;
    this.apiService.getPayments(null, this.dateFrom, this.dateTo).subscribe(
      payments => {
        this.loading = false;
        this.errorMessage = "";
        this.payments = payments;
      },
      error => {
        this.loading = false;
        this.payments = [];
        this.errorMessage = "Could not get payments from the server";
      }
    );
  }
}
