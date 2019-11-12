import {
  trigger,
  transition,
  group,
  query,
  style,
  animate
} from "@angular/animations";

export const switchViews = trigger("logging", [
  transition("* => right", [
    group([
      query(
        ":enter",
        [
          style({
            transform: "translateX(100vw)"
          }),
          animate("300ms 400ms ease-out", style({ transform: "translateX(0)" }))
        ],
        { optional: true }
      ),
      query(
        ":leave",
        [animate("300ms ease-out", style({ transform: "translateX(-100vw)" }))],
        { optional: true }
      )
    ])
  ]),
  transition("* => left", [
    group([
      query(
        ":enter",
        [
          style({
            transform: "translateX(-100vw)"
          }),
          animate("300ms 400ms ease-out", style({ transform: "translateX(0)" }))
        ],
        { optional: true }
      ),
      query(
        ":leave",
        [animate("300ms ease-out", style({ transform: "translateX(100vw)" }))],
        { optional: true }
      )
    ])
  ])
]);
