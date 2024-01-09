export interface IButton {
  type?: string;
  title?: string;
  value?: string;
  currencyCode?: string;
  key?: string;
  active?: boolean;
  icon?: string;
  isNotToolTip?: boolean;
}

export interface ITotalValue {
  totalValueLabel: string;
  totalValueNumber: string;
  currencyCode?: string;
  isNotToolTip?: boolean;
}

export enum ETypeButtons {
  BASIC = "basic",
  CURRENCY_FORMAT = "currency-format",
}