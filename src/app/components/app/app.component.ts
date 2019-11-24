import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { DynamicContentService } from "src/app/services/dynamic-content.service";
import { ApiService } from "src/app/services/api.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild("appView", { static: true, read: ViewContainerRef }) appView;
  constructor(
    private dynamicContentService: DynamicContentService,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.userService.user.next(user);
    this.dynamicContentService.setModalContaineRef(this.appView);
  }
}
