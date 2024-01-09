import { TemplateRef } from "@angular/core";
import { ModalButton } from "./modal.component";

export interface ModalOptions {
  id: string;
  title?: string;
  headerRef?: TemplateRef<any>;
  templateRef?: TemplateRef<any>;
  buttons?: ModalButton[];
  disableClose?: boolean;
  disableTitle?: boolean;
  panelClass?: string | string[];
  isDisabledDragDrop?: boolean;
}
