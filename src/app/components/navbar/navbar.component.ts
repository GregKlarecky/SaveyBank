import { Component, OnInit } from "@angular/core";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { ScreenService } from "src/app/services/screen.service";
import { ApiService } from "src/app/services/api.service";
import { UserService } from "src/app/services/user.service";
import { IUser } from "src/app/interfaces/user.interface";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public menuIcon = faBars;
  public homeIcon = faHome;
  public user: IUser;
  constructor(
    private screenService: ScreenService,
    private apiService: ApiService,
    private userService: UserService
  ) {
    this.userService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}

  public toggleMenu() {
    this.screenService.toggleSidemenu.next(true);
  }
}
