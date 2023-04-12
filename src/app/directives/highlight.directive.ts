import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input() searchedWord!: string; // searchText
  @Input() content!: string; // HTML content
  @Input() customClass!: string; //class to apply for highlighting
  @Input() setTitle = false; //sets title attribute of HTML

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.content) {
      return;
    }

    if (this.setTitle) {
      this.renderer.setProperty(this.el.nativeElement, 'title', this.content);
    }

    if (!this.searchedWord || !this.searchedWord.length || !this.customClass) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerHTML',
        this.content
      );
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const re = new RegExp(`(${this.searchedWord})`, 'gi');
    return this.content.replace(
      re,
      `<span class="${this.customClass}">$1</span>`
    );
  }
}
