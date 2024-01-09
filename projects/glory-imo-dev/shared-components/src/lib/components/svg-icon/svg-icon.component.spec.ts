import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SvgIconComponent } from "./svg-icon.component";
import { Component, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Icons } from "../../constants/icons";

@Component({
  selector: "imo-mock",
  template: `
    <imo-svg-icon
      fxFlex
      [url]="url"
      [icon]="icon"
      [alt]="alt"
      [iconAlt]="iconAlt"
      [text]="text"
      [width]="width"
      [height]="height"
      [color]="color"
    >
    </imo-svg-icon>
  `,
})
class MockComponent {
  url: string;
  alt: string;
  width: number;
  height: number;
  color: string;
  icon: string;
  iconAlt: string;
  text: string;
}

describe("SvgIconComponent", () => {
  let component: SvgIconComponent;
  let fixture: ComponentFixture<SvgIconComponent>;
  let mockComponent: MockComponent;
  let mockFixture: ComponentFixture<MockComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [SvgIconComponent, MockComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgIconComponent);
    component = fixture.componentInstance;
    mockFixture = TestBed.createComponent(MockComponent);
    mockComponent = mockFixture.componentInstance;
    debugElement = mockFixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Input", () => {
    it("should set inputs", () => {
      // arrange
      const expected = {
        url: "asset/something",
        alt: "This is something",
        height: "100",
        width: "24",
        color: "red",
      };
      mockComponent.url = expected.url;
      mockComponent.alt = expected.alt;
      mockComponent.height = Number(expected.height);
      mockComponent.width = Number(expected.width);
      mockComponent.color = expected.color;
      // act
      mockFixture.detectChanges();
      const element: HTMLElement = debugElement.query(By.css("img")).nativeElement;
      // assert
      expect(element).not.toBeNull();
      expect(element.getAttribute("src")).toEqual(expected.url);
      expect(element.getAttribute("alt")).toEqual(expected.alt);
      expect(element.getAttribute("height")).toEqual(expected.height);
      expect(element.getAttribute("width")).toEqual(expected.width);
      expect(element.classList).toContain(expected.color);
    });

    const targetIcons = [
      Icons.uploading,
      Icons.validating,
      Icons.complete,
      Icons.error,
      Icons.inProgress,
      Icons.scheduled,
      Icons.failure,
      Icons.invalid,
      Icons.critical,
      Icons.information,
      Icons.warning,
      Icons.arrows,
      Icons.arrowDown,
      Icons.arrowUp,
      Icons.statusWarning,
      Icons.statusError,
      Icons.balloon,
      Icons.plusComment,
      Icons.caretLeft,
      Icons.calendar,
      Icons.caretRight,
      Icons.checkCircleOutline,
      Icons.caretDoubleLeft,
      Icons.caretDoubleRight,
      Icons.criticalHigh,
      Icons.criticalLow,
      Icons.warningHigh,
      Icons.warningLow,
      Icons.ok,
      Icons.check,
      Icons.spinner,
      Icons.openInNew,
      Icons.plus,
      Icons.minus,
    ];
    targetIcons.forEach((target) => {
      it(`should display ${target.icon} with ${target.src}`, (done) => {
        // arrange
        mockComponent.icon = target.icon;
        mockComponent.alt = target.icon;

        // act
        mockFixture.detectChanges();

        // assert
        const iconElement = debugElement.query(By.css("img"));
        expect(iconElement.properties.src).toEqual(target.src);
        expect(iconElement.properties.alt).toEqual(target.icon);
        const spanElement = debugElement.query(By.css(".icon-text"));
        expect(spanElement).not.toBeTruthy();

        done();
      });
    });

    const targetAltIcons = [Icons.critical, Icons.information, Icons.warning, Icons.ng];
    targetAltIcons.forEach((target) => {
      it(`should display ${target.icon} with ${target.src}, ${target.text}(alt)`, (done) => {
        // arrange
        mockComponent.icon = target.icon;
        mockComponent.iconAlt = target.icon;
        mockComponent.text = target.text;

        // act
        mockFixture.detectChanges();

        // assert
        const iconElement = debugElement.query(By.css("img"));
        expect(iconElement.properties.src).toEqual(target.src);
        expect(iconElement.properties.alt).toEqual(target.text);
        if (target.text != null) {
          const spanElement = debugElement.query(By.css(".icon-text"));
          expect(spanElement).toBeTruthy();
        }

        done();
      });
    });
  });
});
