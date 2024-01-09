import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SvgIconModule } from "../svg-icon/svg-icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { BreadcrumbComponent } from "./breadcrumb.component";

describe("BreadcrumbComponent", () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: "**", component: BreadcrumbComponent }]), SvgIconModule, TranslateModule.forRoot()],
      declarations: [BreadcrumbComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("checkIsRouting", () => {
    it("should return value by call function checkIsRouting", () => {
      // arrange
      const spy = jest.spyOn(component, "checkIsRouting");
      // act
      component.checkIsRouting("path");
      // assert
      expect(spy).toHaveBeenCalledWith("path");
    });
  });
});
