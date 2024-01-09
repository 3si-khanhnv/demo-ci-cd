export interface ILabelColor {
  value: number;
  label: string;
  current: string;
  bgColor: string;
  zeroBgColor?: string;
  textColor?: string;
  textSize?: string;
  isDisabled?: boolean;
  [key: string]: any;
}
export interface IDataEmitChart {
  [key: string]: any;
  index: number;
}

export interface IDoughnutPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export const initPadding: IDoughnutPadding = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
