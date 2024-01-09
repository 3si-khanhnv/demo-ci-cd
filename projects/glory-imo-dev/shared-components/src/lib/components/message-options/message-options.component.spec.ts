import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MessageOptionsComponent } from "./message-options.component";

const options = {
  message: "Orders XXXXXXXXXXXXXXXXXXXX, YYYYYYYYYYYYYYYYYYYYY, ZZZZZZZZZZZZZ for this date already created",
  status: "warning",
};

describe("MessageOptionsComponent", () => {
  let component: MessageOptionsComponent;
  let fixture: ComponentFixture<MessageOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageOptionsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageOptionsComponent);
    component = fixture.componentInstance;
    component.options = options;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
