import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { CheckboxComponent } from "./checkbox.component";
import { CheckboxData } from "./checkbox.component.i";

describe("CheckboxComponent", () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  const data: CheckboxData = {
    label: "Parent",
    key: "parent",
    value: false,
    disabled: false,
    children: [
      {
        label: "Child 1",
        key: "child1",
        value: false,
        disabled: true,
      },
      {
        label: "Child 2",
        key: "child2",
        value: false,
        disabled: true,
        children: [
          { label: "Child 2.1", key: "child2.1", value: false, disabled: true },
          {
            label: "Child 2.2",
            key: "child2.2",
            value: false,
            disabled: true,
            children: [{ label: "Child 2.2.1", key: "child2.2.1", value: false, disabled: true }],
          },
        ],
      },
      {
        label: "Child 3",
        key: "child3",
        value: false,
        disabled: true,
      },
      {
        label: "Child 4",
        key: "child4",
        value: false,
        disabled: true,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onClickChanged", () => {
    it("should call handleWhenOnChecked function when change", () => {
      // arrange
      const eventChange = { checked: true } as MatCheckboxChange;
      const spy = jest.spyOn(component, "handleWhenOnChecked");
      // act
      component.onClickChanged(eventChange);
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onChildrenCheckChanged", () => {
    it("should call onChildrenCheckChanged and emit onCheckedValue", (done) => {
      const value: CheckboxData = {
        label: "Parent",
        key: "parent",
        value: true,
        disabled: false,
      };
      component.onCheckedValue.subscribe({
        next: (actual) => {
          expect(actual).toEqual(value);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onChildrenCheckChanged(value);
    });
  });

  describe("onDisable", () => {
    it("should disable all children", () => {
      // arrange
      component.data = {
        label: "Parent",
        key: "parent",
        value: false,
        disabled: false,
        children: [
          {
            label: "Child 1",
            key: "child1",
            value: false,
            disabled: true,
            children: [
              {
                label: "Child 1",
                key: "child1",
                value: false,
                disabled: true,
              },
            ],
          },
        ],
      };

      const expected: CheckboxData = {
        label: "Parent",
        key: "parent",
        value: false,
        disabled: false,
        children: [
          {
            label: "Child 1",
            key: "child1",
            value: false,
            disabled: true,
            children: [
              {
                label: "Child 1",
                key: "child1",
                value: false,
                disabled: true,
              },
            ],
          },
        ],
      };

      const children: CheckboxData[] = component.data.children;
      const spy = jest.spyOn(component, "onDisable");
      // act
      component.onDisable(children);

      // assert
      expect(component.data).toEqual(expected);
      expect(spy).toHaveBeenCalled();
    });

    it("should do nothing when data have not child", () => {
      // arrange
      component.data = {
        label: "Parent",
        key: "parent",
        value: true,
        disabled: false,
      };

      const expected: CheckboxData = {
        label: "Parent",
        key: "parent",
        value: true,
        disabled: false,
      };

      const children: CheckboxData[] = data.children;

      // act
      component.onDisable(children);

      // assert
      expect(component.data).toEqual(expected);
    });
  });

  describe("onKeyupChange", () => {
    it("should call handleWhenOnChecked function when press enter key", () => {
      // arrange
      const spy = jest.spyOn(component, "handleWhenOnChecked");
      const eventMock = new KeyboardEvent("keyup", { code: "Enter" });

      // act
      component.onKeyupChange(eventMock);

      // assert
      expect(spy).toHaveBeenCalledWith();
    });

    it("should not call handleWhenOnChecked function when press enter key", () => {
      // arrange
      const spy = jest.spyOn(component, "handleWhenOnChecked");
      const eventMock = new KeyboardEvent("keyup", { code: "KeyA" });

      // act
      component.onKeyupChange(eventMock);

      // assert
      expect(spy).not.toHaveBeenCalledWith();
    });
  });

  describe("handleWhenOnChecked", () => {
    it("should enable child nearest", () => {
      // arrange
      component.data = {
        label: "Parent",
        key: "parent",
        value: true,
        disabled: false,
        children: [
          {
            label: "Child 1",
            key: "child1",
            value: false,
            disabled: true,
            children: [
              {
                label: "Child 1",
                key: "child1",
                value: false,
                disabled: true,
              },
            ],
          },
        ],
      };

      const expected: CheckboxData = {
        label: "Parent",
        key: "parent",
        value: true,
        disabled: false,
        children: [
          {
            label: "Child 1",
            key: "child1",
            value: false,
            disabled: false,
            children: [
              {
                label: "Child 1",
                key: "child1",
                value: false,
                disabled: true,
              },
            ],
          },
        ],
      };

      // act
      component.handleWhenOnChecked();

      // assert
      expect(component.data).toEqual(expected);
    });

    it("should return value when case not have child", () => {
      // arrange
      component.data = {
        label: "Parent",
        key: "parent",
        value: true,
        disabled: false,
      };

      const expected: CheckboxData = {
        label: "Parent",
        key: "parent",
        value: true,
        disabled: false,
      };

      // act
      component.handleWhenOnChecked();

      // assert
      expect(component.data).toEqual(expected);
    });

    it("should disable all children", () => {
      // arrange
      component.data = {
        label: "Parent",
        key: "parent",
        value: false,
        disabled: false,
        children: [
          {
            label: "Child 1",
            key: "child1",
            value: false,
            disabled: true,
            children: [
              {
                label: "Child 1",
                key: "child1",
                value: false,
                disabled: true,
              },
            ],
          },
        ],
      };

      const expected: CheckboxData = {
        label: "Parent",
        key: "parent",
        value: false,
        disabled: false,
        children: [
          {
            label: "Child 1",
            key: "child1",
            value: false,
            disabled: true,
            children: [
              {
                label: "Child 1",
                key: "child1",
                value: false,
                disabled: true,
              },
            ],
          },
        ],
      };

      // act
      component.handleWhenOnChecked();

      // assert
      expect(component.data).toEqual(expected);
    });
  });

  describe("onCheckAfterClickedTemp", () => {
    it("should call event and emit onClickedTemp after have onClickedTemp", (done) => {
      // arrange
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const data = {
        label: "",
        value: false,
        key: "",
      };
      component.onClickedTemp.subscribe({
        next: (actual) => {
          expect(actual).toEqual(!data.value);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });

      // act
      const comp = component.onCheckAfterClickedTemp(event);
      const expected = undefined;

      // assert
      expect(comp).toEqual(expected);
    });

    it("should call event not emit onClickedTemp", () => {
      // arrange
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const sy = jest.spyOn(component.onClickedTemp, "emit");
      component.onClickedTemp.observers = [];

      // act
      component.onCheckAfterClickedTemp(event);
      // assert
      expect(sy).not.toHaveBeenCalled();
    });
  });
});
