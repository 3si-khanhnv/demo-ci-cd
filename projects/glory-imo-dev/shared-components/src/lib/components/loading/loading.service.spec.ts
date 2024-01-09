import { TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";

import * as moment from "moment";
import { LoadingComponent } from "./loading.component";
import { LoadingService } from "./loading.service";

describe(LoadingService.name, () => {
  let service: LoadingService;

  let matDialogMock;
  let matDialogRefMock;
  let toastrServiceMock;

  beforeEach(async () => {
    jest.restoreAllMocks();

    matDialogMock = {
      open: jest.fn(),
    };

    matDialogRefMock = {
      close: jest.fn(),
    };

    toastrServiceMock = {
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      providers: [
        LoadingService,
        [
          { provide: MatDialogRef, useValue: matDialogRefMock },
          { provide: MatDialog, useValue: matDialogMock },
          { provide: ToastrService, useValue: toastrServiceMock },
        ],
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(LoadingService);
  });

  describe("open", () => {
    it("should open dialog", () => {
      // arrange
      service.isOpen = false;
      jest.spyOn(service, "timeoutTimer$").mockReturnValue(of(null));

      // act
      service.open();

      // assert
      expect(matDialogMock.open).toHaveBeenCalledWith(LoadingComponent, { disableClose: true });
      expect(service.timeoutTimer$).toHaveBeenCalled();
    });

    it("should not open dialog when already open", () => {
      // arrange
      service.isOpen = true;
      jest.spyOn(service, "timeoutTimer$").mockReturnValue(of(null));

      // act
      service.open();

      // assert
      expect(matDialogMock.open).not.toHaveBeenCalled();
      expect(service.timeoutTimer$).toHaveBeenCalled();
    });
  });

  describe("openWithoutTimeout", () => {
    it("should open dialog", () => {
      // arrange
      service.isOpen = false;
      jest.spyOn(service, "timeoutTimer$").mockReturnValue(of(null));

      // act
      service.openWithoutTimeout();

      // assert
      expect(matDialogMock.open).toHaveBeenCalledWith(LoadingComponent, { disableClose: true });
      expect(service.timeoutTimer$).not.toHaveBeenCalled();
    });

    it("should not open dialog when already open", () => {
      // arrange
      service.isOpen = true;
      jest.spyOn(service, "timeoutTimer$").mockReturnValue(of(null));

      // act
      service.openWithoutTimeout();

      // assert
      expect(matDialogMock.open).not.toHaveBeenCalled();
      expect(service.timeoutTimer$).not.toHaveBeenCalled();
    });
  });

  describe("close", () => {
    it("should close dialog", () => {
      // arrange
      service.loading = matDialogRefMock;
      service.isOpen = true;
      service.timeout = {} as any;

      // act
      service.close();

      // assert
      expect(matDialogRefMock.close).toHaveBeenCalled();
    });

    it("should not close dialog when already close", () => {
      // arrange
      service.isOpen = false;
      service.timeout = null;

      // act
      service.close();

      // assert
      expect(matDialogRefMock.close).not.toHaveBeenCalled();
    });
  });

  describe("timeoutTimer$", () => {
    it("should close dialog when timeout", () => {
      // arrange
      service.isOpen = false;

      const openTime = moment.utc("1234-05-06 12:34:56.000");
      const serviceMock = new LoadingService({} as any, {} as any);
      serviceMock.timeoutTime = 0;
      serviceMock.isOpen = true;
      serviceMock.openTime = openTime;

      serviceMock.toastrService = service.toastrService;

      serviceMock.close = jest.fn();
      // act
      return service
        .timeoutTimer$(openTime, serviceMock)
        .toPromise()
        .then((data) => {
          // assert

          expect(data).toEqual(null);
          expect(serviceMock.toastrService.error).toHaveBeenCalledWith("No response from server", "Error", {
            closeButton: true,
            timeOut: 3000,
          });
          expect(serviceMock.close).toHaveBeenCalled();
        })
        .catch((err) => fail(err));
    });

    it("should not close dialog when timeout but not open", () => {
      // arrange
      service.isOpen = false;

      const openTime = moment.utc("1234-05-06 12:34:56");
      const serviceMock = new LoadingService({} as any, {} as any);
      serviceMock.timeoutTime = 0;
      serviceMock.isOpen = false;
      serviceMock.openTime = moment.utc("1234-05-06 12:34:56");
      serviceMock.close = jest.fn();
      // act
      return service
        .timeoutTimer$(openTime, serviceMock)
        .toPromise()
        .then(() => {
          // assert
          expect(serviceMock.close).not.toHaveBeenCalled();
        })
        .catch((err) => fail(err));
    });

    it("should not close dialog when other timeoutTimer", () => {
      // arrange
      service.isOpen = false;

      const openTime = moment.utc("1234-05-06 12:34:56");
      const serviceMock = new LoadingService({} as any, {} as any);
      serviceMock.timeoutTime = 0;
      serviceMock.isOpen = true;
      serviceMock.openTime = moment.utc("1234-05-06 12:34:57");
      serviceMock.close = jest.fn();
      // act
      return service
        .timeoutTimer$(openTime, serviceMock)
        .toPromise()
        .then(() => {
          // assert
          expect(serviceMock.close).not.toHaveBeenCalled();
        })
        .catch((err) => fail(err));
    });
  });
});
