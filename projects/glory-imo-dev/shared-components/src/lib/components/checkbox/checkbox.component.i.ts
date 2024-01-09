export interface CheckboxData {
  label: string;
  value: boolean;
  key: string;
  disabled?: boolean;
  children?: CheckboxData[];
  alwayDisabledAndKeepValue?: boolean;
  isError?: boolean;
  id?: number;
  parentId?: number;
}
