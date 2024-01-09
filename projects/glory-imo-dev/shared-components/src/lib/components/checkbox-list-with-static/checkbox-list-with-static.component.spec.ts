import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CheckboxListWithStaticComponent } from "./checkbox-list-with-static.component";
import { CheckboxListWithStaticData } from "./checkbox-list-with-static.component.i";

const data: CheckboxListWithStaticData = {
  list: [
    { value: "option1", label: "Option 1", readonly: true },
    { value: "option2", label: "Option 2", readonly: true },
    { value: "option3", label: "Option 3", readonly: false },
    { value: "option4", label: "Option 4", readonly: false },
  ],
  checkedItem: [],
};

describe("CheckboxListWithStaticComponent", () => {
  let component: CheckboxListWithStaticComponent;
  let fixture: ComponentFixture<CheckboxListWithStaticComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [CheckboxListWithStaticComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxListWithStaticComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
