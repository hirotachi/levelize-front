import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  constructor(private el: ElementRef) {}

  tooltipEl: HTMLElement | null = null;

  @Input('tooltip') set tooltip(value: string) {
    if (!value) {
      return;
    }
    this.tooltipEl = document.createElement('span');
    this.tooltipEl.classList.add('tooltip__value');
    this.tooltipEl.innerText = value;
    this.el.nativeElement.appendChild(this.tooltipEl);
    this.el.nativeElement.classList.add('tooltip__container');
    this.el.nativeElement.style.cursor = 'pointer';
  }

  @Input('tooltipMinWidth') set tooltipMinWidth(value: number) {
    if (!value || !this.tooltipEl) {
      return;
    }

    this.tooltipEl.style.minWidth = `${value}px`;
  }
}
