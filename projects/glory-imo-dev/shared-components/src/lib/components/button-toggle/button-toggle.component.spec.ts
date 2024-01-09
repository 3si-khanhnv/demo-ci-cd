import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonToggleComponent } from "./button-toggle.component";
import { TranslateModule } from "@ngx-translate/core";

describe("ButtonToggleComponent", () => {
  let component: ButtonToggleComponent;
  let fixture: ComponentFixture<ButtonToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ButtonToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onChangeOption", () => {
    it("should call onChangeOption and emit the action", (done) => {
      const event = "all";
      component.selectedOption.subscribe({
        next: (actual) => {
          expect(actual).toEqual(event);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });

      component.onChangeOption(event);
    });
  });
});
