import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '@services/submissions.service';
import { SalarySubmission } from '../../types';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['./submissions-table.component.scss'],
})
export class SubmissionsTableComponent implements OnInit {
  submissions: SalarySubmission[] = [];
  limit = 5;
  page = 1;

  displayedColumns: string[] = ['company'];

  expandedElements: Record<string, boolean> = {};

  constructor(private submissionsService: SubmissionsService) {}

  ngOnInit(): void {
    this.submissionsService
      .getSubmissions(this.limit, this.page)
      .subscribe((submissions) => {
        this.submissions = submissions;
      });
  }

  toggleRow(id: string) {
    this.expandedElements[id] = !this.expandedElements[id];
  }

  isExpanded(id: string) {
    return this.expandedElements[id];
  }
}
