import { Component, OnInit, Input } from "@angular/core";
import { IUser } from "src/app/interfaces/user.interface";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-account-info",
  templateUrl: "./account-info.component.html",
  styleUrls: ["./account-info.component.scss"]
})
export class AccountInfoComponent implements OnInit {
  @Input() user: IUser;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;
    });
  }
}
