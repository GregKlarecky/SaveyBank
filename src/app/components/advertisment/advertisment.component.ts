import { Component, OnInit, Input } from "@angular/core";
import { adMock1 } from "./ad.mock";

@Component({
  selector: "app-advertisment",
  templateUrl: "./advertisment.component.html",
  styleUrls: ["./advertisment.component.scss"]
})
export class AdvertismentComponent implements OnInit {
  @Input() data = adMock1;
  constructor() {}

  ngOnInit() {}
}
