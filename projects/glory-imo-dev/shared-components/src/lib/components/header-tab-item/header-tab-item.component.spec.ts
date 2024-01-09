import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderTabItemComponent } from "./header-tab-item.component";
import { HeaderTabItemModule } from "./header-tab-item.module";

describe("HeaderTabItemComponent", () => {
  let component: HeaderTabItemComponent;
  let fixture: ComponentFixture<HeaderTabItemComponent>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      imports: [HeaderTabItemModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
