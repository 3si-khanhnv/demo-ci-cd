export interface ILabelColorItem {
  value: number;
  label: string;
  bgColor: string;
}
export interface ILabelColor {
  label: string;
  labelColorItem: ILabelColorItem[];
}

export interface IDataEmitChart {
  [key: string]: any;
  index: number;
}
export interface IDataChart {
  title: string;
  label: string;
  total: string[];
  color: string[];
  details?: IDataChart[];
  [key: string]: any;
}
export interface IDataTotal {
  label: string;
  labelColorItem: ILabelColor[];
}
export interface ILabelColor {
  label: string;
  bgColor: string;
  value: number;
}

export const responsiveRange = [
  {
    range: [0, 3],
    description: "From 0 to 3 items",
    barThickness: 56,
    margin: 24,
    dataLabelSize: 14,
  },
  {
    range: [4, 7],
    description: "From 4 to 7 items",
    barThickness: 32,
    margin: 12,
    dataLabelSize: 14,
  },
  {
    range: [8, undefined],
    description: "Over 8 items",
    barThickness: 24,
    margin: 12,
    dataLabelSize: 14,
  },
];
