import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { StatusInfoComponent } from "./status-info.component";
import { StatusInfoModule } from "./status-info.module";

describe("StatusInfoComponent", () => {
  let component: StatusInfoComponent;
  let fixture: ComponentFixture<StatusInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatusInfoModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
