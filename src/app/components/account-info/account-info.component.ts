import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { IUser } from "src/app/interfaces/user.interface";
import { UserService } from "src/app/services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-account-info",
  templateUrl: "./account-info.component.html",
  styleUrls: ["./account-info.component.scss"]
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  @Input() user: IUser;
  public userSubscription: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userSubscription = this.userService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
