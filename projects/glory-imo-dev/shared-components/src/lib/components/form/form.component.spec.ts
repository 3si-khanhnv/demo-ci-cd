import { ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormComponent } from "./form.component";
import { TranslateModule } from "@ngx-translate/core";

describe("FormComponent", () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule, MatInputModule, BrowserAnimationsModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should setInputElement with not has content", () => {
    // arrange
    const expected: ElementRef = component.inputElement;

    // act
    component.setInputElement = undefined as ElementRef;
    fixture.detectChanges();

    // assert
    expect(component.inputElement).toBe(expected);
  });

  it("should setInputElement with content", () => {
    // arrange
    const expected: ElementRef = { nativeElement: { style: { height: "initial" }, scrollHeight: 64 } };
    // act
    component.setInputElement = { nativeElement: { style: { height: "initial" }, scrollHeight: 64 } };
    // assert
    expect(component.inputElement).toEqual(expected);
  });

  it("should call ngOnInit defaultValue is not null ", () => {
    component.defaultValue = "TEST";
    component.ngOnInit();
    expect(component.formControl.value).toEqual("TEST");
  });

  it("should call ngOnInit defaultValue is null ", () => {
    component.defaultValue = undefined;
    component.ngOnInit();
    expect(component.formControl.value).toEqual("");
  });

  it("should test data field", () => {
    component.defaultValue = "TEST";
    component.ngOnInit();

    const spy = jest.spyOn(component.value, "emit");
    const el = fixture.nativeElement.querySelector("input");
    el.value = "something";
    el.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spy).toBeCalledWith("something");
    });
  });

  it("should add attribute to input element", () => {
    // arrange
    component.defaultValue = undefined;
    component.labels = { aria: "", placeholder: "", attrs: { min: 0 } };
    const spy = jest.spyOn(component.inputElement.nativeElement, "setAttribute");

    // act
    component.ngOnInit();
    component.ngAfterViewInit();

    // assert
    expect(spy).toBeCalled();
    expect(component.inputElement.nativeElement.getAttribute("min")).toBe("0");
  });

  it("should add attribute to input element with not have labels", () => {
    // arrange
    component.defaultValue = undefined;
    component.labels = undefined;
    const spy = jest.spyOn(component.inputElement.nativeElement, "setAttribute");

    // act
    component.ngOnInit();
    component.ngAfterViewInit();

    // assert
    expect(spy).not.toBeCalled();
    // expect(component.inputElement.nativeElement.getAttribute("min")).toBe;
  });

  it("should not add attribute to input element when label not exits", () => {
    // arrange
    component.defaultValue = undefined;
    component.labels = undefined;
    const spy = jest.spyOn(component.inputElement.nativeElement, "setAttribute");

    // act
    component.ngOnInit();

    // assert
    expect(spy).not.toBeCalled();
  });

  it("should not add attribute to input element when attribute value not exits", () => {
    // arrange
    component.defaultValue = undefined;
    component.labels = { aria: "", placeholder: "" };
    const spy = jest.spyOn(component.inputElement.nativeElement, "setAttribute");

    // act
    component.ngOnInit();

    // assert
    expect(spy).not.toBeCalled();
  });

  it("should updated height value", () => {
    // arrange
    const expected = "60px";
    component.inputElement = { nativeElement: { style: { height: "initial" }, scrollHeight: 64 } } as any;

    // act
    component.onKeyUp();
    fixture.detectChanges();

    // assert
    expect(component.inputElement.nativeElement.style.height).toEqual(expected);
  });
});
