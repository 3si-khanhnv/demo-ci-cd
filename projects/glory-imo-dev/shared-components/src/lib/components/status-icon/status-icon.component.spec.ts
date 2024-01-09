import { SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatusIconComponent } from "./status-icon.component";
import { StatusIconModule } from "./status-icon.module";
import { Icons } from "../../constants/icons";

describe("StatusIconComponent", () => {
  let component: StatusIconComponent;
  let fixture: ComponentFixture<StatusIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnChanges", () => {
    it("ngOnChanges when the type have value", () => {
      const previousValue = "";
      const currentValue = "statusGood";
      component.ngOnChanges({
        type: new SimpleChange(previousValue, currentValue, false),
      });
      fixture.detectChanges();

      expect(component.url).toEqual(Icons.statusGood.src);
      expect(component.alt).toEqual(Icons.statusGood.alt);
      expect(component.className).toEqual(Icons.statusGood.class);
    });
    it("ngOnChanges when value empty", () => {
      component.ngOnChanges({});
      fixture.detectChanges();

      expect(component.url).toEqual("");
      expect(component.alt).toEqual("");
      expect(component.className).toEqual("");
    });
  });
});
