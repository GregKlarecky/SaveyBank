import { Directive, HostBinding, Input, OnInit } from "@angular/core";
import { Observable, fromEvent } from "rxjs";
import { tap, map, pairwise, bufferCount, filter } from "rxjs/operators";

@Directive({
  selector: "[appOnScroll]"
})
export class OnScrollDirective implements OnInit {
  @Input() changeHeight: boolean;
  @Input() translate: boolean;
  public breakpoint: number = 50;

  @HostBinding("class.nav-narrow") navNarrow;
  @HostBinding("class.nav-thick") navThick;
  @HostBinding("style.transform") transform;
  // @HostBinding("style.transition") transition =
  //   "transform ease-in 200ms, height ease-in 200ms";

  constructor() {}

  ngOnInit() {
    this.onScroll.subscribe();
  }

  public onScroll: Observable<any> = fromEvent(window, "scroll").pipe(
    map(() => document.scrollingElement.scrollTop),
    tap(scrollTop => {
      if (scrollTop <= this.breakpoint && this.changeHeight) {
        this.navThick = true;
        this.navNarrow = false;
      } else if (scrollTop <= this.breakpoint && this.translate) {
        this.transform = "translateY(0px)";
      }
    }),
    filter(scrollTop => scrollTop > this.breakpoint),
    pairwise(),
    bufferCount(5),
    tap(values => {
      const movements = values.map(pair => (pair[0] > pair[1] ? 1 : -1));
      const verticalMove = movements.reduce((total, num) => total + num);
      const upwardsMove = verticalMove > 0;
      this.changeStyle(upwardsMove);
    })
  );

  changeStyle(upwardsMove) {
    if (!upwardsMove && this.translate) {
      this.transform = "translateY(-50px)";
    } else if (upwardsMove && this.translate) {
      this.transform = "translateY(0px)";
    } else if (!upwardsMove && this.changeHeight) {
      this.navNarrow = true;
      this.navThick = false;
    } else if (upwardsMove && this.changeHeight) {
      this.navNarrow = false;
      this.navThick = true;
    }
  }
}
