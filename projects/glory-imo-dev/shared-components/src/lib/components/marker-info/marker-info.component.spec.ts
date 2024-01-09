import { SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { MarkerInfoComponent } from "./marker-info.component";
import { MarkerInfoModule } from "./marker-info.module";

describe("MarkerInfoComponent", () => {
  let component: MarkerInfoComponent;
  let fixture: ComponentFixture<MarkerInfoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MarkerInfoModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerInfoComponent);
    component = fixture.componentInstance;
    component.typeIdList = [];
    component.statusInfoList = [];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnChanges", () => {
    it("ngOnChanges when the type have value", () => {
      const previousValue = {
        MAX_HEIGHT_TYPEID_LIST: 123,
        HEIGHT_AREA_STORE: 123,
        PX_TO_REM: 123,
        MAX_TYPEID_ITEM_DISPLAY: 123,
      };
      const currentValue = {
        HEIGHT_MARKER_INFO: 480,
        HEIGHT_STATUS_INFO_LIST: 0,
        HEIGHT_TYPEID_ITEM: 21,
        MARGIN_TYPEID: 8,
        MAX_HEIGHT_TYPEID_LIST: 192,
        HEIGHT_AREA_STORE: 44,
        PX_TO_REM: 16,
        MAX_TYPEID_ITEM_DISPLAY: 9,
      };
      component.ngOnChanges({
        type: new SimpleChange(previousValue, currentValue, false),
      });
      fixture.detectChanges();

      expect(component.config).toEqual(currentValue);
    });
    it("ngOnChanges when value empty", () => {
      const previousValue = {
        HEIGHT_MARKER_INFO: 480,
        HEIGHT_STATUS_INFO_LIST: 0,
        HEIGHT_TYPEID_ITEM: 21,
        MARGIN_TYPEID: 8,
        MAX_HEIGHT_TYPEID_LIST: 192,
        HEIGHT_AREA_STORE: 44,
        PX_TO_REM: 16,
        MAX_TYPEID_ITEM_DISPLAY: 9,
      };
      component.ngOnChanges({});
      fixture.detectChanges();

      expect(component.config).toEqual(previousValue);
    });
  });

  describe("onCloseInfo", () => {
    it("should call onCloseInfo and emit the action", (done) => {
      const event: any = {
        value: "ok",
      };
      component.clicked.subscribe({
        next: (actual) => {
          expect(actual).toEqual(event);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onCloseInfo(event);
    });
  });
});
