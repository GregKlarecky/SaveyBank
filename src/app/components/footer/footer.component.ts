import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  public services: string[] = ["Help", "Contact us", "Security", "Privacy"];
  constructor() {}

  ngOnInit() {}
}
