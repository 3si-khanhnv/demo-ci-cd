import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatMenuModule } from "@angular/material/menu";
import { SelectFormatComponent } from "./select-format.component";

describe("SelectFormatComponent", () => {
  let component: SelectFormatComponent;
  let fixture: ComponentFixture<SelectFormatComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [SelectFormatComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onSelectedFormat()", () => {
    it("should emit selected item from the list", (done) => {
      // arrange
      component.items = [
        { value: "pdf", label: "PDF", default: true },
        { value: "csv", label: "CSV", default: false },
        { value: "xml", label: "XML", default: false },
      ];
      fixture.detectChanges();

      const expected = "pdf";

      // assert
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });

      // act
      component.onSelectedFormat("pdf");
    });
  });
});
