import { NO_ERRORS_SCHEMA } from "@angular/compiler";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SourceIconComponent } from "./source-icon.component";
import { TranslateModule } from "@ngx-translate/core";
describe("SourceIconComponent", () => {
  let component: SourceIconComponent;
  let fixture: ComponentFixture<SourceIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceIconComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SourceIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onClickSourceIcon", () => {
    it("should call onClickSourceIcon and emit the action", (done) => {
      component.transaction = {
        transactionId: "4444",
        transactionDateTime: "2021-04-11 18:56:12",
        timezone: "GMT",
        transactionType: ["EndExchangeEvent"],
        serialNumber: ["10001"],
        messageSequenceNumber: "12345",
        companyName: "ABC Inc",
        locationName: "Canterbury",
        asset: "C150 2822",
        user: ["user"],
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
        hasComments: true,
      };

      const customEvent = new CustomEvent("myEvent", {
        bubbles: true,
        composed: true,
        detail: { someProperty: "wrong value" },
      });

      // assert
      component.clickSourceIcon.subscribe({
        next: (value) => {
          expect(value).toEqual(component.transaction);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onClickSourceIcon(customEvent);
    });
  });
});
