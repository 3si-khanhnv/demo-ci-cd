import { TemplateRef } from "@angular/core";

export interface AlertDialogData {
  text?: string;
  iconText?: {
    icon?: string;
    text?: string;
  };
  dynamicText?: string;
  templateRef?: TemplateRef<any>;
  buttonLabels?: {
    cancel?: string;
    ok: string;
    isErrorClass?: boolean;
    okClass?: { [key: string]: any };
  };
  style?: { [key: string]: any };
  panelClass?: string;
}
