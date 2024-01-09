export interface OptionValue {
  key: string;
  value: boolean;
}

export interface LabelledValue<T, C = { [key: string]: unknown }> {
  label: string;
  disabled?: boolean;
  icon?: string;
  value: T;
  isHidden?: boolean;
  customLabel?: { fullContentToSearch: string } & C;
}
