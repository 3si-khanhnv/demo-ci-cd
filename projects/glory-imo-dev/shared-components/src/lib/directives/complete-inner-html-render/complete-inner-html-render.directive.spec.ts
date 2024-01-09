import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CompleteInnerHtmlRenderDirective } from "./complete-inner-html-render.directive";

@Component({
  template: ` <div #container [innerHtml]="html" imoCompleteInnerHtmlRender (innerHtmlCompleteRendered)="updatedView()"></div> `,
})
class TestComponent {
  html = "<span>display</span>";

  @ViewChild(CompleteInnerHtmlRenderDirective) directive: CompleteInnerHtmlRenderDirective;
  @ViewChild("container", { read: ElementRef }) myContainer: ElementRef;

  updatedView() {}
}

describe("CompleteInnerHtmlRender", () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CompleteInnerHtmlRenderDirective, TestComponent],
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should be defined", () => {
    expect(component).toBeDefined();
    expect(component.directive).toBeDefined();
  });

  it("should have directive", () => {
    // arrange
    const directives = fixture.debugElement.queryAll(By.directive(CompleteInnerHtmlRenderDirective));
    const expected = 1;

    // act
    const act = directives.length;

    // assert
    expect(act).toEqual(expected);
  });

  it("should emit a event when render innerHTML completed", () => {
    // arrange
    jest.spyOn(component, "updatedView");
    jest.spyOn(component.directive.innerHtmlCompleteRendered, "emit");

    // act
    component.html = "<p>New</p>";
    fixture.detectChanges();

    // assert
    // TODO
    // expect(component.directive.innerHtmlCompleteRendered.emit).toHaveBeenCalled()
    // expect(component.updatedView).toHaveBeenCalled();
  });
});
