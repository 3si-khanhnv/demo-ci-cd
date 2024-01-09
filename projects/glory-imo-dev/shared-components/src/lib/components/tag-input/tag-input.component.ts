import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "imo-tag-input",
  templateUrl: "./tag-input.component.html",
  styleUrls: ["./tag-input.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TagInputComponent implements OnInit, AfterViewInit {
  @Input()
  default: string;

  @Input()
  requiredPlaceholder: string[];

  @Input()
  haveSpacePrefix = false;

  @ViewChild("contentEditable")
  contentEditable: ElementRef<HTMLDivElement>;

  _value: string;
  rootElement: HTMLDivElement;
  @Input()
  set value(data: string) {
    if (data !== this._value && this.requiredPlaceholder) {
      this.renderedValue = this.renderHtml(data);
      this._value = data;

      setTimeout(() => {
        if (this.contentEditable) {
          this.contentEditable.nativeElement.childNodes.forEach((node) => {
            node.textContent = node.textContent.includes(this.fakeChar) ? node.textContent : this.fakeChar + node.textContent;
          });
        }
      }, 0);
    }
  }
  get value(): string {
    return this._value;
  }

  @Input()
  controlValidator = new FormControl<string>("");

  @Output()
  changed = new EventEmitter<string>();

  renderedValue: SafeHtml;
  focused: boolean;
  fakeChar = "\x00";
  spaceChar = "&nbsp;";

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.renderingValue();
  }

  renderingValue(value = this.valueRender) {
    this.renderedValue = this.renderHtml(value);
    setTimeout(() => {
      this.moveToEndOfNode(this.contentEditable.nativeElement.lastChild);
    }, 0);
  }

  ngAfterViewInit(): void {
    this.rootElement = this.contentEditable.nativeElement;
    // fix space node issue
    this.contentEditable.nativeElement.childNodes.forEach((node) => {
      node.textContent = node.textContent.includes(this.fakeChar) ? node.textContent : this.fakeChar + node.textContent;
    });
  }

  get valueRender(): string {
    return this.value ?? this.default;
  }

  renderHtml(value: string): SafeHtml {
    let result = value;
    this.requiredPlaceholder.forEach((i) => {
      const searchValue = this.haveSpacePrefix ? ` ${i} ` : i;
      const replaceValue = this.haveSpacePrefix
        ? `<span class="tag">${this.spaceChar}${i}${this.spaceChar}</span>`
        : `<span class="tag">${i}</span>`;

      result = result.replace(searchValue, replaceValue);
    });
    this.updateValue(value);

    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

  moveToNextNode(activeNode: Node, selection: Selection = window.getSelection()) {
    try {
      let node = activeNode.nextSibling;

      if (node === null) {
        node = document.createTextNode(this.fakeChar);
        activeNode.parentNode.append(node);
      }

      const range = document.createRange();
      range.setStart(node, 1);
      selection.removeAllRanges();
      range.collapse();
      selection.addRange(range);
      selection.collapseToStart();
    } catch (error) {
      debugger;
    }
  }

  moveToPrevNode(activeNode: Node, selection: Selection = window.getSelection()) {
    try {
      let node = activeNode.previousSibling;

      if (node === null) {
        node = document.createTextNode(this.fakeChar);
        activeNode.parentNode.prepend(node);
      }

      const range = document.createRange();
      range.setStart(node, node.textContent.length);
      selection.removeAllRanges();
      range.collapse();
      selection.addRange(range);
      selection.collapseToStart();
    } catch (error) {
      debugger;
    }
  }

  onMouseUp(event: Event) {
    const sel: Selection = window.getSelection();

    if (sel.focusNode.parentNode.nodeName === "SPAN") {
      event.preventDefault();

      if (sel.focusOffset > sel.focusNode.textContent.length / 2) {
        this.moveToNextNode(sel.focusNode.parentNode, sel);
      } else {
        this.moveToPrevNode(sel.focusNode.parentNode, sel);
      }
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    const eventKey = event.key;
    const sel: Selection = window.getSelection();

    if (["Enter"].includes(eventKey)) {
      event.preventDefault();
    }

    if (sel.focusNode.parentNode.nodeName === "SPAN") {
      event.preventDefault();

      switch (eventKey) {
        case "Backspace":
          this.moveToPrevNode(sel.focusNode.parentNode, sel);
          break;

        case "Delete":
          this.moveToNextNode(sel.focusNode.parentNode, sel);
          break;

        default:
          break;
      }
    }

    if (sel.focusNode.nodeName === "#text") {
      const isEndString = sel.rangeCount && sel.focusOffset === sel.focusNode.textContent.length;
      const isStartString = sel.rangeCount && sel.focusOffset === 0;
      const nextSibling = sel.focusNode.nextSibling;
      const isSpanNextSibling = nextSibling?.nodeName === "SPAN";
      const previousSibling = sel.focusNode.previousSibling;
      const isSpanPreviousSibling = previousSibling?.nodeName === "SPAN";

      switch (eventKey) {
        case "ArrowRight":
        case "Delete":
        case "End":
          if (isEndString && isSpanNextSibling) {
            this.moveToNextNode(nextSibling, sel);
          }
          break;

        case "ArrowLeft":
        case "Backspace":
        case "Home":
          if (isStartString && isSpanPreviousSibling) {
            this.moveToPrevNode(previousSibling, sel);
          }
          break;

        case "Enter":
          event.preventDefault();
          break;

        default:
          break;
      }
    }

    if (/^[\w\s-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]{1,1}$/.test(eventKey) && !event.ctrlKey) {
      this.selectAllHandling(event);
    }
  }

  moveToStartOfNode(node: Node = this.rootElement, selection: Selection = window.getSelection()) {
    if (node.hasChildNodes()) {
      node = node.firstChild;
    }

    const range = document.createRange();
    range.setStart(node, 0);
    selection.removeAllRanges();
    range.collapse();
    selection.addRange(range);
    selection.collapseToStart();
  }

  onKeyUp(event: KeyboardEvent): void {
    const eventKey = event.key;
    const sel: Selection = window.getSelection();
    const element = this.contentEditable.nativeElement;
    const nodes = element.childNodes;

    if (sel.focusNode.parentNode.nodeName === "SPAN") {
      event.preventDefault();

      switch (eventKey) {
        case "ArrowRight":
        case "Delete":
          this.moveToNextNode(sel.focusNode.parentNode, sel);
          break;

        case "ArrowLeft":
        case "Backspace":
          this.moveToPrevNode(sel.focusNode.parentNode, sel);
          break;

        default:
          break;
      }
    }

    if (["Backspace", "Delete"].includes(eventKey) && nodes.length === 0) {
      if (this.isSelectAll) {
        const node = document.createTextNode(this.fakeChar);
        this.contentEditable.nativeElement.replaceChildren(node);
      }

      this.insertMissingPlaceHolder();
    }
  }

  onInput(event: InputEvent) {
    const target = event.target as HTMLElement;
    const text: string = target.innerText;
    this.updateValue(text);
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
  }

  onSelectStart(event: Event): void {
    console.log(event);
  }

  completedRenderInputContent() {
    this.contentEditable.nativeElement.childNodes.forEach((node) => {
      node.textContent = node.textContent.includes(this.fakeChar) ? node.textContent : this.fakeChar + node.textContent;
    });
  }

  updateValue(value: string): void {
    let formatValue = value.replace(/\0/g, "");
    if (this.haveSpacePrefix) {
      formatValue = formatValue.replace(/\u00a0/g, " ");
    }

    this._value = formatValue;
    this.controlValidator.patchValue(formatValue.trim());
    this.changed.emit(formatValue);
  }

  moveToEndOfNode(activeNode: Node, selection: Selection = window.getSelection()) {
    try {
      if (!selection.rangeCount) return;
      let node = activeNode;

      if (node === null) {
        node = document.createTextNode(this.fakeChar);
        this.contentEditable.nativeElement.prepend(node);
      }

      const range = document.createRange();
      range.setStart(node, node.textContent.length);
      selection.removeAllRanges();
      range.collapse();
      selection.addRange(range);
      selection.collapseToStart();
    } catch (error) {
      debugger;
    }
  }

  selectAllHandling(event: KeyboardEvent) {
    if (this.isSelectAll) {
      const node = document.createTextNode(this.fakeChar);
      this.contentEditable.nativeElement.replaceChildren(node);
    }

    setTimeout(() => {
      const sel: Selection = window.getSelection();

      if (/^[\w\s-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]{1,1}$/.test(event.key) && sel.focusNode.nodeName === "#text") {
        const element = this.contentEditable.nativeElement;
        const isMissingPlaceholder = !this.requiredPlaceholder.every((p) => element.textContent.includes(p));
        if (isMissingPlaceholder) {
          this.insertMissingPlaceHolder();

          if (element.childNodes.length) {
            this.moveToEndOfNode(element.lastChild);
          }
        }
      }
    }, 0);
  }

  insertMissingPlaceHolder() {
    const element = this.rootElement;
    this.requiredPlaceholder.forEach((placeholder) => {
      const isMissing = !element.textContent.includes(placeholder);

      if (isMissing) {
        const placeholderHtml = document.createElement("span");
        placeholderHtml.classList.add("tag");
        placeholderHtml.textContent = this.haveSpacePrefix ? `\u00a0${placeholder}\u00a0` : placeholder;
        element.prepend(placeholderHtml);
        element.prepend(document.createTextNode(this.fakeChar));
      }
    });

    this.updateValue(element.innerText);
  }

  get isSelectAll() {
    const selection: Selection = window.getSelection();
    const element = this.contentEditable.nativeElement;
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    return element.innerText === selectedText;
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    if (this.isSelectAll) {
      const node = document.createTextNode(this.fakeChar);
      this.contentEditable.nativeElement.replaceChildren(node);
    }

    const paste = event.clipboardData.getData("text/plain");
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      const node = document.createTextNode(this.fakeChar + paste);
      selection.deleteFromDocument();
      selection.getRangeAt(0).insertNode(node);
      selection.collapseToEnd();

      const isContainPlaceholders = this.requiredPlaceholder.every((p) => this.contentEditable.nativeElement.innerText.includes(p));
      if (isContainPlaceholders) {
        this.updateValue(this.contentEditable.nativeElement.innerText);
      } else {
        this.insertMissingPlaceHolder();
      }
    }, 0);
  }

  onCut(event: ClipboardEvent) {
    if (this.isSelectAll) {
      event.preventDefault();
      const node = document.createTextNode(this.fakeChar);
      this.rootElement.replaceChildren(node);
      this.insertMissingPlaceHolder();
      this.moveToEndOfNode(this.rootElement.lastChild);
    }
  }
}
