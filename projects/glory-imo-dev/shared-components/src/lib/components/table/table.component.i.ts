import { TemplateRef } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { IDynamicCreateComponent } from "../../directives/dynamic-create-component";
import { ModalButton } from "../modal/modal.component";
import { LabelledValue } from "../checkbox-list/checkbox-list.component.i";

export interface TableField {
  name: string;
  column: string;
  style?: { [key: string]: any };
  sortAlignLeft?: boolean;
  checkAll?: boolean;
  modalRef?: {
    id: string;
    title?: string;
    headerRef?: TemplateRef<any>;
    templateRef?: TemplateRef<any>;
    buttons?: ModalButton[];
    disableClose?: boolean;
    disableTitle?: boolean;
    panelClass?: string | string[];
    isDisabledDragDrop?: boolean;
  };
  disabled?: boolean;
}

export interface TableRecord {
  [key: string]:
    | any
    | {
        dynamicCreateComponent: true;
        componentData: IDynamicCreateComponent<any, any>;
      };
  checked?: boolean;
}

export interface Sorting {
  column: string;
  sort: string;
}

export interface SelectFieldColumn<T = string> {
  options: LabelledValue<T>[];
  disabled?: boolean;
  isReadonly?: boolean;
  selectedItem?: T;
  placeholder?: string;
}

export interface InputFieldColumn {
  control: UntypedFormControl;
  label: {
    placeholder?: string;
    aria?: string;
  };
  changeFieldColor?: string;
}

export type CheckBoxField = {
  [key: string]: any;
};

export interface ChangeCheckbox {
  key: string;
  checked: boolean;
  label: string;
  row: {
    key: string;
    keyParent?: string;
  };
}

export interface DynamicKeyPermission {
  [key: string]: any;
}

export interface RowData {
  index: number;
  value: boolean;
}

export enum HolidayNameSetting {
  NAME = "holidayName",
  PLACEHOLDER = "Input name",
  MAX_LENGTH = 255,
}

export interface CompanyData {
  id?: number;
  company?: string;
  locationId?: number;
  location?: string;
  citId?: number;
  citName?: string;
  checked?: boolean;
  pavementLimit?: string;
  customerNumber?: string;
  customerNumberInputField?: { inputLabel: unknown; control: UntypedFormControl };
}

export interface TotalCurrencyValue {
  labelTotalGroup: string;
  isGroup: boolean;
  valueTotalGroup: string | number;
  currency: string;
  type: string;
  mainIndex: number;
}