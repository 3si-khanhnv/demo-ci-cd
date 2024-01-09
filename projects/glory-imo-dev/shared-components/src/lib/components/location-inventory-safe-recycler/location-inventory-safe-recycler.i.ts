export interface IChartSafeRecycler {
  titleChart: string;
  data: ILocationSafeRecycler;
}

export interface ILocationSafeRecycler {
  dataChart: IDataChartSafeRecycler[];
  labels: ILabelColor[];
}

export interface IDataChartSafeRecycler {
  locationName: string;
  recyclerValue: number;
  safeValue: number;
}

export interface ILabelColor {
  label: string;
  bgColor?: string;
  borderWidth?: string | number;
}
