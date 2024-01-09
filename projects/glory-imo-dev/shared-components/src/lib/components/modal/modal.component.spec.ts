import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ModalButton, ModalComponent } from "./modal.component";
import { TranslateModule } from "@ngx-translate/core";

const modalButtons = [
  { name: "Cancel", value: false },
  { name: "OK", value: true, isDisabled: true, primary: true },
];
@Component({
  selector: "imo-button",
  template: "",
})
class MockButtonComponent {
  @Input() required: boolean;
  @Input() isDisabled: boolean;
}

describe("ModalComponent", () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [ModalComponent, MockButtonComponent],
      imports: [MatDialogModule, DragDropModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onClose", () => {
    it("should call onClose when imo-button is clicked", () => {
      // arrange
      component.data = {
        title: "string",
        buttons: modalButtons,
        taskLink: false,
        showCloseButton: true,
        isDisabledDragDrop: false,
      };
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css("imo-button"));
      jest.spyOn(component, "onClose");
      // act
      buttons.forEach((button, i) => {
        const calledNumber = i + 1;

        button.nativeElement.click();
        expect(component.onClose).toHaveBeenCalledTimes(calledNumber);
      });
    });

    it("should call onClose with validationFn modal buttons", () => {
      // arrange
      const modalButtonsWithValidationFn: ModalButton[] = [
        { name: "Cancel", value: false },
        {
          name: "OK",
          value: true,
          isDisabled: true,
          primary: true,
          validationFn: () => {
            return true;
          },
        },
      ];
      component.data = {
        title: "string",
        buttons: modalButtonsWithValidationFn,
        taskLink: false,
        showCloseButton: true,
        isDisabledDragDrop: false,
      };
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css("imo-button"));
      jest.spyOn(component, "onClose");
      // act
      buttons.forEach((button, i) => {
        const calledNumber = i + 1;

        button.nativeElement.click();
        expect(component.onClose).toHaveBeenCalledTimes(calledNumber);
      });
    });

    it("should not call onClose when imo-button is clicked", () => {
      // arrange
      component.data = {
        title: "string",
        buttons: modalButtons,
        taskLink: false,
        isDisabledDragDrop: false,
      };
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css(".header > imo-button"));
      jest.spyOn(component, "onClose");
      // act
      buttons.forEach((button) => {
        button.nativeElement.click();
        expect(component.onClose).toHaveBeenCalledTimes(0);
      });
    });
  });
});
