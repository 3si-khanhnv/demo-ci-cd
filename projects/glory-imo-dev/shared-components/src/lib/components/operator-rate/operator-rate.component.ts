import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  IContentChart,
  IDataEmit,
  IDataInput,
  IFilter,
  ILabelCiConnector,
  ILabelHeaderTabs,
  ILocationGroup,
  ITypeGood,
} from "./operator-rate.i";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

@Component({
  selector: "imo-operator-rate",
  templateUrl: "./operator-rate.component.html",
  styleUrls: ["./operator-rate.component.scss"],
})
export class OperatorRateComponent {
  @Input() selectedTabIndex: number;
  @Input() dataFilters: IFilter;
  @Input() locationGroup: ILocationGroup[] = [];
  @Input() labelError: string;
  @Input() viewChart: number[] = [168, 168];
  @Input() labelHeaderTabs: ILabelHeaderTabs;
  @Input() contentChart: IContentChart;
  @Input() typeGood: ITypeGood[];
  @Input() dataInput: IDataInput[];
  @Input() isCheck: boolean;
  @Input() isShowHightLightError = true;
  @Input() typeOperator = "EOD";
  @Input() colorScheme = {
    domain: ["#22BB86", "#FFD800", "#E74E30"],
  };
  @Input() totalLocations: number;
  @Input() totalCiConnector: number;
  @Input() labelCiConnector: ILabelCiConnector;

  @Output() emitHighlightErrors = new EventEmitter<boolean>();
  @Output() emitItem = new EventEmitter<string | ITypeGood>();
  @Output() emitTabIndex = new EventEmitter<number>();
  @Output() emitLocation = new EventEmitter<IDataEmit>();

  public handleHighlightErrors(e: boolean) {
    this.emitHighlightErrors.emit(e);
  }

  public selectItemInfo(item: string | ITypeGood) {
    this.emitItem.emit(item);
  }

  public onTabChanged({ index }) {
    this.emitTabIndex.emit(index);
  }

  public selectLocation(companyName: LabelledValue<string>, locationName: LabelledValue<string>) {
    this.emitLocation.emit({ companyName: companyName.value, locationName: locationName.value });
  }
}
