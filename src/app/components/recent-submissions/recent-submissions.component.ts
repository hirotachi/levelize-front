import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '@services/submissions.service';
import { UtilsService } from '@services/utils.service';
import { Store } from '@ngrx/store';
import { FilterState, selectCurrentTrack } from '../../state/filter.reducer';
import { Router } from '@angular/router';
import { SalarySubmission } from '../../types';

@Component({
  selector: 'app-recent-submissions',
  templateUrl: './recent-submissions.component.html',
  styleUrls: ['./recent-submissions.component.scss'],
})
export class RecentSubmissionsComponent implements OnInit {
  currentTrack: string = '';
  latestSubmissions!: SalarySubmission[];
  constructor(
    private submissionsService: SubmissionsService,
    public utils: UtilsService,
    private store: Store<{ filter: FilterState }>,
    private router: Router
  ) {
    this.store.select(selectCurrentTrack).subscribe((currentTrack) => {
      this.currentTrack = currentTrack;
    });
  }

  public jobs: string[] = [
    'Software Engineer',
    'Front End Developer',
    'Back End Developer',
    'Product Manager',
    'UX Designer',
  ];

  handleTrackChange = (event: MouseEvent, track: string) => {
    event.preventDefault();
    this.router.navigate([], {
      queryParams: { track: track },
      queryParamsHandling: 'merge',
    });
  };

  ngOnInit(): void {
    this.submissionsService.getLatestSubmissions().subscribe((submissions) => {
      this.latestSubmissions = submissions;
    });
  }
}
