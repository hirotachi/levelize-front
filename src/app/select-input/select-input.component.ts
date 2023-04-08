import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent {
  @Input() options: string[] = [];
  @Input() value: string = '';
  @Input() onChange: (value: string) => void = () => {};

  @Input() placeholder: string = 'Select an option';

  @Input() prefixIcon?: string;

  search: string = '';

  isOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: EventTarget) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    this.isOpen = clickedInside;
    if (!clickedInside) {
      this.search = '';
    }
  }

  toggle() {
    if (this.isOpen) {
      this.search = '';
    }
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.search = '';
    this.isOpen = false;
    this.onChange(option);
  }
}
