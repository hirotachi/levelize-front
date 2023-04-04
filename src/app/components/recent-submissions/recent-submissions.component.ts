import { Component } from '@angular/core';
import { SubmissionsService } from '@services/submissions.service';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-recent-submissions',
  templateUrl: './recent-submissions.component.html',
  styleUrls: ['./recent-submissions.component.scss'],
})
export class RecentSubmissionsComponent {
  constructor(
    public submissionsStore: SubmissionsService,
    public utils: UtilsService
  ) {}

  public jobs: string[] = [
    'Software Engineer',
    'Front End Developer',
    'Back End Developer',
    'Product Manager',
    'UX Designer',
  ];
}
