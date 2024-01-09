import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LabelColorComponent } from "./label-color.component";
import { TranslateModule } from "@ngx-translate/core";

describe("LabelColorComponent", () => {
  let component: LabelColorComponent;
  let fixture: ComponentFixture<LabelColorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelColorComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
