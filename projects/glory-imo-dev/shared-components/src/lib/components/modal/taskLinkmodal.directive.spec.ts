import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";
import { LinkmodalDirective } from "./taskLinkmodal.directive";

describe("LinkmodalDirective", () => {
  let directive: LinkmodalDirective;
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
    directive = new LinkmodalDirective(modal);
  });

  it("should create an instance", () => {
    expect(directive).toBeTruthy();
  });

  it("should call openModal when trigger click", () => {
    const spy = jest.spyOn(directive, "openModal");
    directive.onClick();
    expect(spy).toHaveBeenCalled();
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
