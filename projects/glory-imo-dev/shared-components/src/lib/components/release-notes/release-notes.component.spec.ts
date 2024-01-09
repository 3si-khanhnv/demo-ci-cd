import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { ReleaseNotesComponent } from "./release-notes.component";

describe("ReleaseNotesComponent", () => {
  let component: ReleaseNotesComponent;
  let fixture: ComponentFixture<ReleaseNotesComponent>;

  const releaseNotes = {
    "1.0.0": {
      fixed: ["new feature1", "new feature2"],
      new: ["bugfix1", "bugfix2"],
    },
  };

  beforeEach(async () => {
    jest.restoreAllMocks();
    await TestBed.configureTestingModule({
      declarations: [ReleaseNotesComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNotesComponent);
    component = fixture.componentInstance;
    component.releaseNotes = releaseNotes;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("releaseNotesKeys", () => {
    it("should be array have data", () => {
      // arrange
      component.releaseNotes = releaseNotes;

      // assert
      expect(component.releaseNotesKeys).toEqual(["1.0.0"]);
    });
  });
});
