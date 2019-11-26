import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
  keyframes
} from "@angular/animations";

export const routeFade = trigger("routeAnimations", [
  transition("* <=> *", [
    style({ position: "relative" }),
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          width: "100%"
        })
      ],
      { optional: true }
    ),
    query(":enter", [style({ opacity: 0 })], { optional: true }),
    query(":leave", animateChild(), { optional: true }),
    group([
      query(
        ":leave",
        [
          animate(
            "700ms ease-out",
            keyframes([
              style({ opacity: 0, offset: 0.4 }),
              style({ opacity: 0, offset: 1 })
            ])
          )
        ],
        { optional: true }
      ),
      query(
        ":enter",
        [
          animate(
            "700ms ease-out",
            keyframes([
              style({ opacity: 0, offset: 0.6 }),
              style({ opacity: 1, offset: 1 })
            ])
          )
        ],
        { optional: true }
      )
    ]),
    query(":enter", animateChild(), { optional: true })
  ])
]);
