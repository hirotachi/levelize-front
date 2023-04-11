import { Component, Input, OnInit } from '@angular/core';

export type PaginatorEvent = {
  page: number;
  pageSize: number;
};
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() page: number = 1;
  @Input() pageSizes: number[] = [5, 10, 25, 50];
  @Input() totalPages: number = 0;
  @Input() onChange: (event: PaginatorEvent) => void = () => {};

  currentPageSize: number = 0;
  currentPage: number = 1;
  constructor() {}

  changePage(page: number) {
    this.currentPage = page;
    this.onChange({ page: this.currentPage, pageSize: this.currentPageSize });
  }

  changePageSize(pageSize: number) {
    this.currentPageSize = pageSize;
    this.onChange({ page: this.currentPage, pageSize: this.currentPageSize });
  }

  ngOnInit(): void {
    this.currentPageSize = this.pageSizes[0];
    this.currentPage = this.page;
  }

  isOpen: boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
