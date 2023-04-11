import { Component, Input } from '@angular/core';
import { Offer } from '../../types';
import { UtilsService } from '@services/utils.service';
import { PaginatorEvent } from '@components/paginator/paginator.component';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['./submissions-table.component.scss'],
})
export class SubmissionsTableComponent {
  @Input() submissions: Offer[] = [];
  @Input() limit = 5;
  @Input() page = 1;
  @Input() totalPages = 0;

  displayedColumns: string[] = [
    'company',
    'title',
    'experience',
    'compensation',
  ];

  expandedElements: Record<string, boolean> = {};

  constructor(public utils: UtilsService) {}

  toggleRow(id: string) {
    this.expandedElements[id] = !this.expandedElements[id];
  }

  isExpanded(id: string) {
    return this.expandedElements[id];
  }

  @Input() onPageChange = (event: PaginatorEvent) => {
    this.limit = event.pageSize;
    this.page = event.page;
    this.expandedElements = {};
  };
}
