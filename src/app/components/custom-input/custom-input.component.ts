import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export type InputProps = {
  label: string;
  value: FormControl;
  placeholder?: string;
  hintText?: string;
  suggestions?: string[];
  type?: 'select' | 'text' | 'number';
};
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent {
  @Input() label: string = '';
  @Input() value: FormControl = new FormControl('');
  @Input() placeholder?: string;
  @Input() hintText?: string;
  @Input() suggestions?: string[];
  @Input() type?: string = 'text';
  showHint: boolean = false;

  getErrorMessage() {
    if (this.value.hasError('required')) {
      return `${this.label} is required`;
    }

    if (this.value.hasError('onlyNumbers')) {
      return 'Only numbers are allowed';
    }

    return this.value.hasError('email') ? 'Not a valid email' : 'error';
  }

  focused = false;
  showSuggestions = false;

  handleClick(event: MouseEvent, suggestion: string) {
    event.stopPropagation();
    this.value.setValue(suggestion);
    this.showSuggestions = false;
  }

  toggleHint(e: MouseEvent) {
    e.stopPropagation();
    this.showHint = !this.showHint;
  }

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: EventTarget) {
    const isClickedInside =
      this.elementRef.nativeElement.contains(targetElement);
    this.showSuggestions = isClickedInside;
    this.focused = isClickedInside;
  }
}
