import { ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import dayjs from "dayjs";
import { DisplayTransactionDateTimeComponent } from "./display-transaction-date-time.component";
import { Transaction } from "./display-transaction-date-time.component.i";
class MockElementRef {
  public nativeElement = {
    offsetHeight: 18,
  };
}
describe("DisplayTransactionDateTimeComponent", () => {
  let component: DisplayTransactionDateTimeComponent;
  let fixture: ComponentFixture<DisplayTransactionDateTimeComponent>;

  const data: Partial<Transaction> = {
    transactionId: "4444",
    transactionDateTime: "2021-04-11 18:56:12",
    hasComments: true,
    timezone: "GMT",
    transactionType: ["EndExchangeEvent"],
    messageSequenceNumber: "12345",
    companyName: "ABC Inc",
    locationName: "Canterbury",
    asset: "C150 2822",
    currency: [
      {
        user: "user",
        currencyCode: "NZD",
        totalValue: 50000,
        decimalPlaces: 2,
        transactionDetail: [
          {
            transactionSubType: "Deposit",
            subTypeValue: 250000,
            denominations: [
              {
                type: "note",
                denominationValue: 1,
                quantity: 2000,
                machineType: "RBW-150",
                value: 200000,
              },
              {
                type: "note",
                denominationValue: 0.5,

                quantity: 1000,
                machineType: "RBW-150",
                value: 50000,
              },
            ],
            manualDetails: [],
          },
          {
            transactionSubType: "CashOut",
            subTypeValue: 200000,
            denominations: [
              {
                type: "note",
                denominationValue: 1,
                quantity: 2000,
                machineType: "RBW-150",
                value: 200000,
              },
            ],
            manualDetails: [],
          },
        ],
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayTransactionDateTimeComponent],
      providers: [{ provide: ElementRef, useClass: MockElementRef }],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTransactionDateTimeComponent);
    component = fixture.componentInstance;
    component.confClientFormats = {
      datetimeFormatSeconds: "YYYY/MM/DD hh:mm:ss",
    };
    component.transaction = data;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("should set transaction data not time zone", () => {
    it("should call on change", () => {
      const transactionDateTime = new Date().toISOString();
      component.transaction = {
        transactionDateTime,
      } as any;
      fixture.detectChanges();
      expect(component.dateTime).toBe(dayjs(transactionDateTime).format("YYYY/MM/DD hh:mm:ss"));
    });
  });
  describe("AfterViewChecked render time zone height > 16", () => {
    it("should set style display to inline-table", () => {
      component.timeZoneChild.nativeElement = {
        offsetHeight: 18,
        style: {
          display: "inline",
        },
      };
      component.ngAfterViewChecked();
      expect(component.timeZoneChild.nativeElement.style.display).toBe("inline-table");
    });
  });
  describe("onClickComment", () => {
    it("should call onClickComment and emit the action", (done) => {
      const customEvent = new CustomEvent("myEvent", {
        bubbles: true,
        composed: true,
        detail: { someProperty: "wrong value" },
      });
      const expected = {
        transactionId: component._transaction.transactionId,
        transactionDateTime: `${component.dateTime}${component.timeZone}`,
        messageSequenceNumber: component._transaction.messageSequenceNumber,
      };
      // assert
      component.clicked.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onClickComment(customEvent);
    });
  });
});
