import { Component, OnInit } from "@angular/core";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public menuIcon = faBars;
  public homeIcon = faHome;
  constructor() {}

  ngOnInit() {}
}
