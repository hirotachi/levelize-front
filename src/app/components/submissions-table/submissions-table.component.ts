import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '@services/submissions.service';
import { Offer } from '../../types';
import { UtilsService } from '@services/utils.service';
import { PaginatorEvent } from '@components/paginator/paginator.component';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['./submissions-table.component.scss'],
})
export class SubmissionsTableComponent implements OnInit {
  submissions: Offer[] = [];
  limit = 5;
  page = 1;

  displayedColumns: string[] = [
    'company',
    'title',
    'experience',
    'compensation',
  ];

  expandedElements: Record<string, boolean> = {};

  constructor(
    private submissionsService: SubmissionsService,
    public utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.submissionsService
      .getSubmissions(this.limit, this.page)
      .subscribe((submissions) => {
        this.submissions = submissions.slice(0, this.limit);
      });
  }

  toggleRow(id: string) {
    this.expandedElements[id] = !this.expandedElements[id];
  }

  isExpanded(id: string) {
    return this.expandedElements[id];
  }

  onPageChange = (event: PaginatorEvent) => {
    this.limit = event.pageSize;
    this.page = event.page;
    this.expandedElements = {};
    this.submissionsService
      .getSubmissions(this.limit, this.page)
      .subscribe((submissions) => {
        this.submissions = submissions.slice(
          this.limit * (this.page - 1),
          this.limit * this.page
        );
      });
  };
}
