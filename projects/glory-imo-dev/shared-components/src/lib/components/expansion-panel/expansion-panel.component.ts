import { animate, state, style, transition, trigger } from "@angular/animations";
import { ENTER, SPACE } from "@angular/cdk/keycodes";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { getLastToken } from "../../utilities/common";
import { ExpansionTableRow } from "../expansion-table/expansion-table.component.i";
import { ExpandColumnType } from "./expansion-panel.component.i";
import { Icons } from "../../constants/icons";

export const EXPANSION_PANEL_ANIMATION_TIMING = "225ms cubic-bezier(0.4,0.0,0.2,1)";

export interface Labels {
  checkbox?: { aria: string };
  headerButton?: { aria: string };
}

@Component({
  selector: "imo-expansion-panel",
  templateUrl: "./expansion-panel.component.html",
  styleUrls: ["./expansion-panel.component.scss"],
  animations: [
    trigger("toggleExpansion", [
      state("collapsed, void", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition("expanded <=> collapsed, void => collapsed", animate(EXPANSION_PANEL_ANIMATION_TIMING)),
    ]),
    trigger("bodyExpansion", [
      state("collapsed, void", style({ height: "0px", visibility: "hidden" })),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition("expanded <=> collapsed, void => collapsed", animate(EXPANSION_PANEL_ANIMATION_TIMING)),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelComponent implements DoCheck {
  @Input() checkbox: boolean;
  @Input() radio: boolean;
  @Input() columns: ExpandColumnType[];
  @Input() data: ExpansionTableRow;
  @Input() showChild: boolean;
  @Input() id: number;

  @Input() labels: Labels;

  @Output() check = new EventEmitter<boolean>();

  public accordion = Icons.accordion;
  public getLastToken = getLastToken;

  constructor(private ref: ChangeDetectorRef) {}

  ngDoCheck() {
    this.ref.markForCheck();
  }

  public onClick(event: MouseEvent) {
    event.preventDefault();
    this.toggle();
  }

  @HostListener("keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        event.preventDefault();
        this.toggle();
        break;
    }
  }

  public toggle() {
    this.showChild = !this.showChild;
  }

  public onCheck(flag: boolean) {
    this.data.checked = !flag;
    this.check.emit(this.data.checked);
  }

  isTextOverflow(elem: HTMLElement): boolean {
    return elem.offsetWidth < elem.scrollWidth;
  }

  isArrayData(data: Partial<ExpansionTableRow>) {
    return Array.isArray(data);
  }
}
