import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { DynamicContentService } from "src/app/services/dynamic-content.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild("appView", { static: true, read: ViewContainerRef }) appView;
  constructor(private dynamicContentService: DynamicContentService) {}

  ngOnInit() {
    this.dynamicContentService.setModalContaineRef(this.appView);
  }
}
