import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loading",
  template: `
    <div class="modal-backdrop">
      <app-spinner class="position"></app-spinner>
    </div>
  `,
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
