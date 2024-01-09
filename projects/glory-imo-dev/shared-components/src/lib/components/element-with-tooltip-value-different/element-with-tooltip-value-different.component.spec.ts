import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ElementWithTooltipValueDifferentComponent } from "./element-with-tooltip-value-different.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ElementWithTooltipValueDifferentData } from "./element-with-tooltip-value-different.component.i";

const data: ElementWithTooltipValueDifferentData = {
  text: "user 1",
  isDisableTooltip: false,
  messageTooltip: "user1@gmail.com",
  positionTooltip: "above",
};

describe("ElementWithTooltipValueDifferentComponent", () => {
  let component: ElementWithTooltipValueDifferentComponent;
  let fixture: ComponentFixture<ElementWithTooltipValueDifferentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementWithTooltipValueDifferentComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ElementWithTooltipValueDifferentComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
