import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransactionViewCommentComponent } from "./transaction-view-comment.component";
import { TransactionViewCommentModule } from "./transaction-view-comment.module";
import { TranslateModule } from "@ngx-translate/core";

describe("CheckboxComponent", () => {
  let component: TransactionViewCommentComponent;
  let fixture: ComponentFixture<TransactionViewCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransactionViewCommentModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionViewCommentComponent);
    component = fixture.componentInstance;
    component.labelDialog = {
      comment: "Comment",
      sequenceNumber: "SequenceNumber",
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("set Comment", () => {
    it("should set Comment", () => {
      // act
      component.comments = [
        {
          userName: "lucky boy",
          commentDatetime: "2023-12-12",
          comment: "Hello World",
        },
      ];

      // assert
      expect(component._comments).toEqual([
        {
          userName: "lucky boy",
          dateTime: "2023-12-12",
          content: "Hello World",
        },
      ]);
    });
  });

  describe("onChangeTest", () => {
    it("should call onChangeTest", (done) => {
      const spyOn = jest.spyOn(component.valueComment, "emit");

      component.valueComment.subscribe({
        next: (value) => {
          expect(spyOn).toHaveBeenCalledWith(value);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onChangeComment("dataTest");
    });
  });
});
