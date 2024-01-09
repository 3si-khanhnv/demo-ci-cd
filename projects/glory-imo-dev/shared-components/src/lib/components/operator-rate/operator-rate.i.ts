import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

export interface IContentChart {
  label: string;
  percent: string | number;
}

export interface IDataInput {
  name: string;
  value: string | number;
}

export interface ITypeGood {
  type: string;
  name: string;
  value: string | number;
  label: string;
}

export interface IFilter {
  location?: string;
}

export interface ILabelHeaderTabs {
  state: string;
  locations: string;
}

export interface ILocationGroup extends LabelledValue<string> {
  subs: LabelledValue<string>[];
}

export interface ILabelCiConnector {
  labelLocation: string;
  labelLocations: string;
  labelByCiConnector: string;
}

export interface IDataEmit {
  companyName: string;
  locationName: string;
}
