import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LicensesComponent } from "./licenses.component";

describe("LicensesComponent", () => {
  let component: LicensesComponent;
  let fixture: ComponentFixture<LicensesComponent>;

  const licenses = "abc";

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [LicensesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesComponent);
    component = fixture.componentInstance;
    component.licenses = licenses;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("input", () => {
    it("should be have data", () => {
      // arrange
      component.licenses = licenses;

      // assert
      expect(component.licenses).toEqual(licenses);
    });
  });
});
