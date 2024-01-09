import { trigger, state, style, transition, animate } from "@angular/animations";

export const onSideNavChange = trigger("onSideNavChange", [
  state(
    "close",
    style({
      width: "2.5rem",
    }),
  ),
  state(
    "open",
    style({
      width: "15rem",
    }),
  ),
  transition("close => open", animate("250ms ease-in")),
  transition("open => close", animate("250ms ease-in")),
]);

export const onMainContentChange = trigger("onMainContentChange", [
  state(
    "close",
    style({
      "margin-left": "2.5rem",
    }),
  ),
  state(
    "open",
    style({
      "margin-left": "15rem",
    }),
  ),
  transition("close => open", animate("250ms ease-in")),
  transition("open => close", animate("250ms ease-in")),
]);

export const animateText = trigger("animateText", [
  state(
    "hide",
    style({
      display: "none",
      opacity: "0",
      width: 0,
    }),
  ),
  state(
    "show",
    style({
      display: "block",
      opacity: "1",
      width: "auto",
    }),
  ),
  transition("close => open", animate("350ms ease-in")),
  transition("open => close", animate("200ms ease-out")),
]);
