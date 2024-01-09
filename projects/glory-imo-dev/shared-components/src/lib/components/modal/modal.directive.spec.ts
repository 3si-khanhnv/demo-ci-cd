import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";
import { ModalComponent } from "./modal.component";
import { ModalDirective } from "./modal.directive";

describe("ModalDirective", () => {
  let directive: ModalDirective;
  let modal: MatDialog;
  class MatDiaLogMock {
    public open = jest.fn().mockReturnThis();
    public afterClosed = jest.fn().mockReturnValue(of());
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useClass: MatDiaLogMock }],
    });

    modal = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
    directive = new ModalDirective(modal);
  });

  it("should create an instance", () => {
    expect(directive).toBeTruthy();
  });

  it("should call openModal when trigger click", () => {
    const spy = jest.spyOn(directive, "openModal");
    directive.onClick();
    expect(spy).toHaveBeenCalled();
  });

  describe("openModal", () => {
    it("modal should call with ModalComponent", () => {
      // arrange
      const spy = jest.spyOn(modal, "open");

      // act
      directive.openModal();

      // assert
      expect(spy).toHaveBeenCalledWith(ModalComponent, {
        width: directive.width,
        height: directive.height,
        data: {
          title: directive.title,
          templateRef: directive.templateRef,
          headerRef: directive.headerRef,
          buttons: directive.buttons,
          disableTitle: directive.disableTitle,
          isDisabledDragDrop: directive.isDisabledDragDrop,
        },
        disableClose: directive.disableClose,
        autoFocus: false,
        panelClass: directive.panelClass,
      });
    });
  });

  it("should open modal and emit result when close", () => {
    const spy = jest.spyOn(directive.action, "emit");
    jest.spyOn(modal, "open").mockImplementation(
      () =>
        ({
          afterClosed: jest.fn(() => of(true)),
        } as any),
    );

    directive.openModal();

    expect(spy).toHaveBeenCalledWith(true);
  });
});
