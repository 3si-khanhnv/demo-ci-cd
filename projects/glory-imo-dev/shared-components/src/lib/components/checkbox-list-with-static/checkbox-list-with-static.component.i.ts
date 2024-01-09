export interface LabelledValue<T, C = { [key: string]: unknown }> {
  label: string;
  disabled?: boolean;
  icon?: string;
  value: T;
  isHidden?: boolean;
  customLabel?: { fullContentToSearch: string } & C;
}


export interface LabelledValueWithReadonly<T> extends LabelledValue<T> {
  readonly: boolean;
}

export interface CheckboxListWithStaticData {
  list: LabelledValueWithReadonly<string>[];
  checkedItem: string[];
}
