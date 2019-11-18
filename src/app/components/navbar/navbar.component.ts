import { Component, OnInit } from "@angular/core";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { ScreenService } from "src/app/services/screen.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public menuIcon = faBars;
  public homeIcon = faHome;
  constructor(private screenService: ScreenService) {}

  ngOnInit() {}

  public toggleMenu() {
    this.screenService.toggleSidemenu.next(true);
  }
}
