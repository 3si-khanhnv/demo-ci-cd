import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";

import { MarkerComponent } from "./marker.component";
import { MarkerModule } from "./marker.module";

describe("MarkerComponent", () => {
  let component: MarkerComponent;
  let fixture: ComponentFixture<MarkerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkerModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.marker = {
      status: "good",
      active: true,
      id: "001",
      disable: false,
      hover: false,
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("actionMouseInOutData", () => {
    it("Handle mouse in item", () => {
      const spy = jest.spyOn(component, "handleMouseInMarker");
      const mouseEvent = debugElement.query(By.css(".dot"));
      mouseEvent.nativeElement.dispatchEvent(new Event("mouseover"));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
    it("Handle mouse out item", () => {
      const spy = jest.spyOn(component, "handleMouseOutMarker");
      const mouseEvent = debugElement.query(By.css(".dot"));
      mouseEvent.nativeElement.dispatchEvent(new Event("mouseout"));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe("handleClickMarker", () => {
    it("Handle click  item when", () => {
      const spy = jest.spyOn(component, "handleClickMarker");
      const mouseEvent = debugElement.query(By.css(".dot"));
      mouseEvent.nativeElement.dispatchEvent(new Event("click"));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
});
