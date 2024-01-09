export interface IStatusInfo {
  label?: string;
  dateTime?: string;
  countTime?: string;
  warning?: string;
  subAssets?: IDataSubAssets[];
}

export interface IDataSubAssets {
  title: string;
  message?: string;
  countTime?: string;
  warning?: string;
}
