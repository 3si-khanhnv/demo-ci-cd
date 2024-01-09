import { TestBed, ComponentFixture } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";

import { AlertComponent } from "./alert.component";
import { AlertModule } from "./alert.module";

describe(AlertComponent.name, () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  let mockDialogRef;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockDialogRef = {
      close: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [AlertModule, TranslateModule.forRoot()],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should return false through dialogRef", () => {
    // arrange

    // act
    component.onCancel();

    // assert
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it("should return true through dialogRef", () => {
    // arrange

    // act
    component.onConfirm();

    // assert
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });
});
