import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By, DomSanitizer } from "@angular/platform-browser";
import { CompleteInnerHtmlRenderDirectiveModule } from "../../directives/complete-inner-html-render/complete-inner-html-render.module";
import { TagInputComponent } from "./tag-input.component";

describe("TagInputComponent", () => {
  let component: TagInputComponent;
  let fixture: ComponentFixture<TagInputComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagInputComponent],
      schemas: [],
      imports: [CompleteInnerHtmlRenderDirectiveModule, CommonModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagInputComponent);
    sanitizer = TestBed.inject(DomSanitizer);
    component = fixture.componentInstance;

    component.default = "[Place Holder]";
    component.requiredPlaceholder = ["[Place Holder]"];
    component.value = "Something [Place Holder] Title";

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("", () => {
      // arrange
      jest.spyOn(component, "renderHtml");

      // act
      component.ngOnInit();

      // assert
      expect(component.renderHtml).toHaveBeenCalledWith(component.value);
    });
  });

  describe("renderHtml", () => {
    it("should call render Html with requiredPlaceholder value in control", () => {
      // arrange
      const value = "[Place Holder] Test";

      const spy = jest.spyOn(sanitizer, "bypassSecurityTrustHtml");

      // act
      component.renderHtml(value);

      // assert
      expect(spy).toHaveBeenCalledWith('<span class="tag">[Place Holder]</span> Test');
    });
  });

  describe("moveToNextNode", () => {
    it("should create new node to move next", () => {
      // arrange
      const sel: Selection = {
        removeAllRanges: () => {},
        addRange: (range) => {
          console.log(range);
        },
        collapseToStart: () => {},
      } as Selection;
      const activeNode: Node = {
        nextSibling: null,
        parentNode: {
          append(nodes) {
            console.log(nodes);
          },
        },
      } as Node;
      jest.spyOn(sel, "removeAllRanges");
      jest.spyOn(sel, "addRange");
      jest.spyOn(sel, "collapseToStart");
      jest.spyOn(document, "createTextNode");
      jest.spyOn(activeNode.parentNode, "append");
      const mockRange: Range = {
        setStart: (node, offset) => {
          console.log(node, offset);
        },
        collapse: () => {},
      } as Range;
      jest.spyOn(document, "createRange").mockReturnValueOnce(mockRange);
      jest.spyOn(mockRange, "setStart");
      jest.spyOn(mockRange, "collapse");

      // act
      component.moveToNextNode(activeNode, sel);

      // assert
      expect(document.createRange).toHaveBeenCalled();
      expect(mockRange.collapse).toHaveBeenCalledWith();
      expect(sel.removeAllRanges).toHaveBeenCalledWith();
      expect(sel.addRange).toHaveBeenCalledWith(mockRange);
      expect(sel.collapseToStart).toHaveBeenCalledWith();
    });
  });

  describe("moveToPrevNode", () => {
    it("should create new node to move previous", () => {
      // arrange
      const sel: Selection = {
        removeAllRanges: () => {},
        addRange: (range) => {
          console.log(range);
        },
        collapseToStart: () => {},
      } as Selection;
      const activeNode: Node = {
        previousSibling: null,
        parentNode: {
          prepend(nodes) {
            console.log(nodes);
          },
        },
      } as Node;
      jest.spyOn(sel, "removeAllRanges");
      jest.spyOn(sel, "addRange");
      jest.spyOn(sel, "collapseToStart");
      jest.spyOn(document, "createTextNode");
      jest.spyOn(activeNode.parentNode, "prepend");
      const mockRange: Range = {
        setStart: (node, offset) => {
          console.log(node, offset);
        },
        collapse: () => {},
      } as Range;
      jest.spyOn(document, "createRange").mockReturnValueOnce(mockRange);
      jest.spyOn(mockRange, "setStart");
      jest.spyOn(mockRange, "collapse");

      // act
      component.moveToPrevNode(activeNode, sel);

      // assert
      expect(document.createTextNode).toHaveBeenCalledWith("\x00");
      expect(document.createRange).toHaveBeenCalled();
      expect(mockRange.collapse).toHaveBeenCalledWith();
      expect(sel.removeAllRanges).toHaveBeenCalledWith();
      expect(sel.addRange).toHaveBeenCalledWith(mockRange);
      expect(sel.collapseToStart).toHaveBeenCalledWith();
    });
  });

  describe("onMouseUp", () => {
    it("should do nothing when mouse up node not name is span", () => {
      // arrange
      const sel: Selection = {
        focusNode: {
          parentNode: {
            nodeName: "DIV",
          },
        },
      } as Selection;
      jest.spyOn(component, "moveToNextNode");
      jest.spyOn(component, "moveToPrevNode");
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      const event = new Event("click");

      // act
      component.onMouseUp(event);

      // assert
      expect(document.getSelection).toHaveBeenCalled();
      expect(component.moveToNextNode).not.toHaveBeenCalled();
      expect(component.moveToPrevNode).not.toHaveBeenCalled();
    });

    it("should move to next node when mouse up", () => {
      // arrange
      const sel: Selection = {
        focusOffset: 4,
        focusNode: {
          textContent: "TNode",
          parentNode: {
            nodeName: "SPAN",
          },
        },
      } as Selection;
      jest.spyOn(component, "moveToNextNode").mockImplementation();
      jest.spyOn(component, "moveToPrevNode");
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      const event = new Event("click");
      jest.spyOn(event, "preventDefault");

      // act
      component.onMouseUp(event);

      // assert
      expect(document.getSelection).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.moveToNextNode).toHaveBeenCalledWith(sel.focusNode.parentNode, sel);
      expect(component.moveToPrevNode).not.toHaveBeenCalled();
    });

    it("should move to previous node when mouse up", () => {
      // arrange
      const sel: Selection = {
        focusOffset: 4,
        focusNode: {
          textContent: "Test Node",
          parentNode: {
            nodeName: "SPAN",
          },
        },
      } as Selection;
      jest.spyOn(component, "moveToNextNode");
      jest.spyOn(component, "moveToPrevNode").mockImplementation();
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      const event = new Event("click");
      jest.spyOn(event, "preventDefault");

      // act
      component.onMouseUp(event);

      // assert
      expect(document.getSelection).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.moveToNextNode).not.toHaveBeenCalled();
      expect(component.moveToPrevNode).toHaveBeenCalledWith(sel.focusNode.parentNode, sel);
    });
  });

  describe(TagInputComponent.prototype.onKeyDown.name, () => {
    it("should move back when enter Backspace in element can't edit", () => {
      // arrange
      const event = new KeyboardEvent("keydown", {
        key: "Backspace",
      });
      jest.spyOn(event, "preventDefault");
      const sel: Selection = {
        focusNode: {
          nodeName: "",
          parentNode: {
            nodeName: "SPAN",
          },
        },
      } as Selection;
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      jest.spyOn(component, "moveToNextNode");
      jest.spyOn(component, "moveToPrevNode").mockImplementation();

      // act
      component.onKeyDown(event);

      // assert
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.moveToNextNode).not.toHaveBeenCalled();
      expect(component.moveToPrevNode).toHaveBeenCalledWith(sel.focusNode.parentNode, sel);
    });

    it("should move next when enter Delete in element can't edit", () => {
      // arrange
      const event = new KeyboardEvent("keydown", {
        key: "Delete",
      });
      jest.spyOn(event, "preventDefault");
      const sel: Selection = {
        focusNode: {
          nodeName: "",
          parentNode: {
            nodeName: "SPAN",
          },
        },
      } as Selection;
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      jest.spyOn(component, "moveToNextNode").mockImplementation();
      jest.spyOn(component, "moveToPrevNode");

      // act
      component.onKeyDown(event);

      // assert
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.moveToNextNode).toHaveBeenCalledWith(sel.focusNode.parentNode, sel);
      expect(component.moveToPrevNode).not.toHaveBeenCalled();
    });

    it("should do nothing when enter not in Delete or Backspace in element can't edit", () => {
      // arrange
      const event = new KeyboardEvent("keydown", {
        key: "a",
      });
      jest.spyOn(event, "preventDefault");
      const sel: Selection = {
        focusNode: {
          nodeName: "",
          parentNode: {
            nodeName: "SPAN",
          },
        },
      } as Selection;
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      jest.spyOn(component, "moveToNextNode");
      jest.spyOn(component, "moveToPrevNode");
      jest.spyOn(component, "isSelectAll", "get").mockReturnValue(false);

      // act
      component.onKeyDown(event);

      // assert
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.moveToNextNode).not.toHaveBeenCalled();
      expect(component.moveToPrevNode).not.toHaveBeenCalled();
    });

    ["End", "Delete", "ArrowRight"].forEach((key) =>
      it(`should move next when type key ${key}`, () => {
        // arrange
        const event = new KeyboardEvent("keydown", {
          key: key,
        });
        jest.spyOn(event, "preventDefault");
        const sel: Selection = {
          focusOffset: 6,
          focusNode: {
            nodeName: "#text",
            textContent: "offset",
            parentNode: {
              nodeName: "DIV",
            },
            nextSibling: {
              nodeName: "SPAN",
            },
          },
          rangeCount: 1,
        } as Selection;
        jest.spyOn(document, "getSelection").mockReturnValue(sel);
        jest.spyOn(component, "moveToNextNode").mockImplementation();
        jest.spyOn(component, "moveToPrevNode");

        // act
        component.onKeyDown(event);

        // assert
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(component.moveToNextNode).toHaveBeenCalled();
        expect(component.moveToPrevNode).not.toHaveBeenCalled();
      }),
    );

    ["Home", "Backspace", "ArrowLeft"].forEach((key) =>
      it(`should move next when type key ${key}`, () => {
        // arrange
        const event = new KeyboardEvent("keydown", {
          key: key,
        });
        jest.spyOn(event, "preventDefault");
        const sel: Selection = {
          focusOffset: 1,
          focusNode: {
            nodeName: "#text",
            textContent: "offset",
            parentNode: {
              nodeName: "DIV",
            },
            previousSibling: {
              nodeName: "SPAN",
            },
          },
          rangeCount: 1,
        } as Selection;
        jest.spyOn(document, "getSelection").mockReturnValue(sel);
        jest.spyOn(component, "moveToNextNode");
        jest.spyOn(component, "moveToPrevNode").mockImplementation();

        // act
        component.onKeyDown(event);

        // assert
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(component.moveToNextNode).not.toHaveBeenCalled();
      }),
    );

    it("should cancel event Enter", () => {
      // arrange
      const event = new KeyboardEvent("keydown", {
        key: "Enter",
      });
      jest.spyOn(event, "preventDefault");
      const sel: Selection = {
        focusOffset: 1,
        focusNode: {
          nodeName: "#text",
          textContent: "offset",
          parentNode: {
            nodeName: "DIV",
          },
        },
        rangeCount: 1,
      } as Selection;
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      jest.spyOn(component, "moveToNextNode");
      jest.spyOn(component, "moveToPrevNode");

      // act
      component.onKeyDown(event);

      // assert
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.moveToNextNode).not.toHaveBeenCalled();
      expect(component.moveToPrevNode).not.toHaveBeenCalled();
    });
  });

  describe("onKeyUp", () => {
    it("should do nothing when cursor not focus in tag SPAN and not type DELETE from keyboard", () => {
      // arrange
      const event = new KeyboardEvent("keyup", { key: "ArrowRight" });
      const sel: Selection = {
        focusOffset: 4,
        focusNode: {
          textContent: "Test Node",
          parentNode: {
            nodeName: "DIV",
          },
        },
      } as Selection;
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      jest.spyOn(component, "moveToNextNode");
      jest.spyOn(component, "moveToPrevNode");
      jest.spyOn(component, "renderHtml");

      // act
      component.onKeyUp(event);

      // assert
      expect(component.moveToNextNode).not.toHaveBeenCalled();
      expect(component.moveToPrevNode).not.toHaveBeenCalled();
      expect(component.renderHtml).not.toHaveBeenCalled();
    });

    it("should call function check move next when input key ArrowRight or Delete", () => {
      // arrange
      const event = new KeyboardEvent("keyup", { key: "ArrowRight" });
      const sel: Selection = {
        focusOffset: 4,
        focusNode: {
          textContent: "Test Node",
          parentNode: {
            nodeName: "SPAN",
          },
        },
      } as Selection;
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      jest.spyOn(component, "moveToNextNode").mockImplementation();
      jest.spyOn(component, "moveToPrevNode");
      jest.spyOn(component, "renderHtml");

      // act
      component.onKeyUp(event);

      // assert
      expect(component.moveToNextNode).toHaveBeenCalledWith(sel.focusNode.parentNode, sel);
      expect(component.moveToPrevNode).not.toHaveBeenCalled();
      expect(component.renderHtml).not.toHaveBeenCalled();
    });

    it("should call function check move previous when input key ArrowLeft or Backspace", () => {
      // arrange
      const event = new KeyboardEvent("keyup", { key: "ArrowLeft" });
      const sel: Selection = {
        focusOffset: 4,
        focusNode: {
          textContent: "Test Node",
          parentNode: {
            nodeName: "SPAN",
          },
        },
      } as Selection;
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      jest.spyOn(component, "moveToNextNode");
      jest.spyOn(component, "moveToPrevNode").mockImplementation();
      jest.spyOn(component, "renderHtml");

      // act
      component.onKeyUp(event);

      // assert
      expect(component.moveToNextNode).not.toHaveBeenCalled();
      expect(component.moveToPrevNode).toHaveBeenCalledWith(sel.focusNode.parentNode, sel);
      expect(component.renderHtml).not.toHaveBeenCalled();
    });

    it("should re-render content when remove items inside input field", () => {
      // arrange
      const event = new KeyboardEvent("keyup", { key: "Delete" });
      const sel: Selection = {
        focusOffset: 4,
        focusNode: {
          textContent: "",
          parentNode: {
            nodeName: "DIV",
          },
        },
      } as Selection;
      jest.spyOn(document, "getSelection").mockReturnValue(sel);
      jest.spyOn(component, "moveToNextNode");
      jest.spyOn(component, "moveToPrevNode");
      jest.spyOn(component, "updateValue").mockImplementation();
      jest.spyOn(component, "isSelectAll", "get").mockReturnValue(false);
      component.contentEditable.nativeElement.textContent = "";

      // act
      component.onKeyUp(event);

      // assert
      expect(component.moveToNextNode).not.toHaveBeenCalled();
      expect(component.moveToPrevNode).not.toHaveBeenCalled();
      expect(component.updateValue).toHaveBeenCalled();
    });
  });

  describe("onInput", () => {
    it("should call when have event input", () => {
      // arrange
      jest.spyOn(component, "onInput");
      const inputEl = fixture.debugElement.query(By.css(".tag-input"));

      // act
      inputEl.triggerEventHandler("input");
      fixture.detectChanges();

      // assert
      expect(component.onInput).toHaveBeenCalled();
    });

    it("should emit new value input", () => {
      // arrange
      jest.spyOn(component.changed, "emit");
      jest.spyOn(component.controlValidator, "patchValue");
      const expected = " value out - [email] -  ";

      // act
      component.onInput({
        target: {
          innerText: " value out - [email] -  ",
        },
      } as any);

      // assert
      expect(component.changed.emit).toHaveBeenCalledWith(expected);
      expect(component.controlValidator.patchValue).toHaveBeenCalledWith(expected.trim());
    });
  });

  describe("onFocus", () => {
    it("should call after focus input", () => {
      // arrange
      jest.spyOn(component, "onFocus");
      const inputEl = fixture.debugElement.query(By.css(".tag-input"));

      // act
      inputEl.triggerEventHandler("focus");
      fixture.detectChanges();

      // assert
      expect(component.onFocus).toHaveBeenCalledWith();
    });

    it("should add class focus input when call", () => {
      // arrange
      component.focused = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css(".tag-input-container.focused"))).not.toBeTruthy();

      // act
      component.onFocus();
      fixture.detectChanges();

      // assert
      expect(component.focused).toEqual(true);
      expect(fixture.debugElement.query(By.css(".tag-input-container.focused"))).toBeTruthy();
    });
  });

  describe("onBlur", () => {
    it("should call after blur input", () => {
      // arrange
      jest.spyOn(component, "onBlur");
      const inputEl = fixture.debugElement.query(By.css(".tag-input"));

      // act
      inputEl.triggerEventHandler("blur");
      fixture.detectChanges();

      // assert
      expect(component.onBlur).toHaveBeenCalledWith();
    });

    it("should remove class focus input when call", () => {
      // arrange
      component.focused = true;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css(".tag-input-container.focused"))).toBeTruthy();

      // act
      component.onBlur();
      fixture.detectChanges();

      // assert
      expect(component.focused).toEqual(false);
      expect(fixture.debugElement.query(By.css(".tag-input-container.focused"))).not.toBeTruthy();
    });
  });
});
