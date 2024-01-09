import { async, TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";

import { AlertService } from "./alert.service";
import { AlertComponent } from "./alert.component";
import { AlertDialogData } from "./alert.model";

const sampleData: AlertDialogData = {
  text: "discard changes?",
  buttonLabels: {
    cancel: "cancel",
    ok: "ok",
  },
};

describe(AlertService.name, () => {
  let service: AlertService;
  let dialogSpy: MatDialog;

  let dialogRefSpyObj;
  let matDialogMock;

  beforeEach(async(() => {
    dialogRefSpyObj = {
      afterClosed: jest.fn().mockReturnValue(of({})),
      close: jest.fn(),
      componentInstance: { body: "" },
    };

    matDialogMock = {
      open: jest.fn().mockReturnValue(dialogRefSpyObj),
    };

    TestBed.configureTestingModule({
      providers: [AlertService, { provide: MatDialog, useValue: matDialogMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(AlertService);
    dialogSpy = TestBed.inject(MatDialog);
  });

  it("should open dialog", () => {
    // arrange

    // act
    service.alert(sampleData);

    // assert
    expect(dialogSpy.open).toHaveBeenCalledWith(AlertComponent, { data: sampleData, disableClose: true });
  });

  it("should return afterClosed stream", () => {
    // arrange

    // act
    const actual = service.alert(sampleData);

    // assert
    expect(actual).toBe(dialogRefSpyObj.afterClosed());
  });
});
