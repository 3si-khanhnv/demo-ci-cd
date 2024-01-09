import { Directive, EventEmitter, HostListener, Input, Output, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalButton, ModalComponent } from "./modal.component";

@Directive({
  selector: "[imoModal]",
})
export class ModalDirective {
  @Input() modalId: string;
  @Input() title: string;
  @Input() headerRef: TemplateRef<any>;
  @Input() templateRef: TemplateRef<any>;
  @Input() buttons: ModalButton[];
  @Input() width: string;
  @Input() height: string;
  @Input() panelClass: string | string[];
  @Input("disableClose") set setDisableClose(value: boolean) {
    if (typeof value === "boolean") {
      this.disableClose = value;
    }
  }
  @Input("disableTitle") set setDisableTitle(value: boolean) {
    if (typeof value === "boolean") {
      this.disableTitle = value;
    }
  }
  @Input("isDisabledDragDrop") set setIsDisabledDragDrop(value: boolean) {
    if (typeof value === "boolean") {
      this.isDisabledDragDrop = value;
    }
  }

  @Output() action = new EventEmitter<string>();

  disableClose = true;
  disableTitle = false;
  isDisabledDragDrop = true;

  @HostListener("click")
  public onClick() {
    this.openModal();
  }

  constructor(public modal: MatDialog) {}

  public openModal() {
    const modalRef = this.modal.open(ModalComponent, {
      width: this.width,
      height: this.height,
      data: {
        title: this.title,
        templateRef: this.templateRef,
        headerRef: this.headerRef,
        buttons: this.buttons,
        disableTitle: this.disableTitle,
        isDisabledDragDrop: this.isDisabledDragDrop,
      },
      disableClose: this.disableClose,
      autoFocus: false,
      panelClass: this.panelClass,
      id: this.modalId,
    });

    modalRef.afterClosed().subscribe((result) => {
      this.action.emit(result);
    });
  }
}
