import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RemovalByDayComponent } from "./removal-by-day.component";
import { ILabels } from "./removal-by-day.i";
import { RemovalByDayModule } from "./removal-by-day.module";
import { TranslateModule } from "@ngx-translate/core";
const dataRemovalByDay: ILabels[] = [
  { value: 1, bgColor: "#F98902", label: "123", current: "" },
  { value: 2, bgColor: "#00A687", label: "123", current: "" },
  { value: 3, bgColor: "#EC3F2E", label: "123", current: "" },
  { value: 4, bgColor: "#018BC8", label: "123", current: "" },
  { value: 5, bgColor: "#A74AB5", label: "123", current: "" },
  { value: 6, bgColor: "#347F8C", label: "123", current: "" },
  { value: 7, bgColor: "#5F9400", label: "123", current: "" },
];
describe("RemovalByDayComponent", () => {
  let component: RemovalByDayComponent;
  let fixture: ComponentFixture<RemovalByDayComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [RemovalByDayModule, NoopAnimationsModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovalByDayComponent);
    component = fixture.componentInstance;
    component.dataRemovalByDay = dataRemovalByDay;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
