import { Directive, Input, HostListener, TemplateRef, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ModalComponent, ModalButton } from "./modal.component";

@Directive({
  selector: "[imoTaskLinkmodal]",
})
export class LinkmodalDirective {
  @Input() title: string;
  @Input() templateRef: TemplateRef<any>;
  @Input() buttons: ModalButton[];
  @Input() width: string;
  @Input() height: string;
  @Input() taskLink: boolean;
  @Input() disableTitle: boolean;

  @Output() action = new EventEmitter<string>();

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
        buttons: this.buttons,
        taskLink: this.taskLink,
        disableTitle: this.disableTitle,
      },
    });

    modalRef.afterClosed().subscribe((result) => {
      this.action.emit(result);
    });
  }
}
