import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search: string = '';
  @ViewChild('myInput') myInput!: ElementRef;

  @HostListener('click') onClick() {
    this.myInput.nativeElement.focus();
  }
  logSearch() {
    this.search = '';
  }
}
