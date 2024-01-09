export interface ILabelColor {
  value: number;
  label: string;
  current: string;
  bgColor: string;
  textColor?: string;
  textSize?: string;
}

export interface IResponsiveRange {
  range: number[];
  barThickness: number;
  margin: number;
  dataLabelSize: number;
  description?: string;
}

export interface IChartSize {
  width: number;
  height: number;
}
