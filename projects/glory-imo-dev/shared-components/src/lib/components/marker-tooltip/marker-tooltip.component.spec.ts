import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { MarkerTooltipComponent } from "./marker-tooltip.component";
import { IMarkerToolTip } from "./marker-tooltip.i";
import { MarkerTooltipModule } from "./marker-tooltip.module";

const DATA: IMarkerToolTip = { markerName: "markerB-1", goodNumber: 2, warningNumber: 2, missingNumber: 5, errorNumber: 2 };

describe("MarkerTooltipComponent", () => {
  let component: MarkerTooltipComponent;
  let fixture: ComponentFixture<MarkerTooltipComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MarkerTooltipModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerTooltipComponent);
    component = fixture.componentInstance;
    component.data = DATA;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
