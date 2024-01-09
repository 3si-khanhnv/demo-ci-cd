export interface ILabels {
  value: number;
  label: string;
  current: string;
  bgColor: string;
  textColor?: string;
  textSize?: string;
}

export interface ILabelsByPercent extends ILabels {
  percent: string;
}
