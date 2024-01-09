import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { SwitchesComponent } from "./switches.component";
import { SwitchesModule } from "./switches.module";

describe("SwitchesComponent", () => {
  let component: SwitchesComponent;
  let fixture: ComponentFixture<SwitchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("On changed Output", () => {
    expect(component).toBeTruthy();
  });

  describe("onChange", () => {
    it("should emit 1 checked with true event", (done) => {
      // arrange
      component.changed.subscribe({
        next: (value) => {
          expect(value).toEqual(true);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      const source = {} as MatSlideToggle;
      component.onChange({ checked: true, source });
    });

    it("should emit 1 checked with false event", (done) => {
      // arrange
      component.changed.subscribe({
        next: (value) => {
          expect(value).toEqual(false);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      const source = {} as MatSlideToggle;
      component.onChange({ checked: false, source });
    });
  });
});
