import { Component, OnInit, HostListener } from "@angular/core";
import { ScreenService } from "src/app/services/screen.service";
import { showHide } from "src/app/animations/show-hide.animations";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { noop } from "rxjs";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
  animations: [showHide]
})
export class SideMenuComponent implements OnInit {
  constructor(
    private screenService: ScreenService,
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) {}
  public active: boolean;

  ngOnInit() {
    this.screenService.toggleSidemenu.subscribe(toggle => {
      document.body.style.overflowY = toggle ? "hidden" : "scroll";
      this.active = toggle;
    });
  }

  @HostListener("click")
  public closeMenu() {
    this.screenService.toggleSidemenu.next(false);
  }

  public logout() {
    this.apiService.logout().subscribe(noop, error => {
      console.error("Unable to logout");
    });
  }

  ngAfterViewInit() {}
}
