import { Component, Inject, Input, TemplateRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as tokens from "../../../assets/i18n/token.json";
const { inform } = tokens;
export interface ModalButton {
  name: string;
  value?: any;
  primary?: boolean;
  isDisabled?: boolean;
  validationFn?: CallableFunction;
}

export interface Data {
  title: string;
  templateRef?: TemplateRef<any>;
  headerRef?: TemplateRef<any>;
  buttons: ModalButton[];
  taskLink: boolean;
  showCloseButton?: boolean;
  message?: string;
  disableTitle?: boolean;
  isDisabledDragDrop: boolean;
}

const TextLabelModal = {
  noContent: inform.common.noContent,
  noTitle: inform.common.noTitle,
};

@Component({
  selector: "imo-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  constructor(private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Data) {}
  @Input() textLabelModal = TextLabelModal;
  get isDisableDragDrop() {
    return typeof this.data.isDisabledDragDrop !== "boolean" ? true : this.data.isDisabledDragDrop;
  }

  public onClose(value?: string, button?: ModalButton) {
    if (button.validationFn instanceof Function) {
      button.validationFn(this.dialogRef);
    } else {
      this.dialogRef.close(value);
    }
  }
}
