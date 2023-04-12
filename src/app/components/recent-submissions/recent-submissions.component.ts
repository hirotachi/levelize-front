import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { Store } from '@ngrx/store';
import { FilterState, selectCurrentTrack } from '../../state/filter.reducer';
import { Router } from '@angular/router';
import { Offer } from '../../types';
import { OfferService } from '@services/offer.service';

@Component({
  selector: 'app-recent-submissions',
  templateUrl: './recent-submissions.component.html',
  styleUrls: ['./recent-submissions.component.scss'],
})
export class RecentSubmissionsComponent implements OnInit {
  currentTrack: string = '';
  latestSubmissions!: Offer[];
  constructor(
    private offerService: OfferService,
    public utils: UtilsService,
    private store: Store<{ filter: FilterState }>,
    private router: Router
  ) {
    this.store.select(selectCurrentTrack).subscribe((currentTrack) => {
      this.currentTrack = currentTrack;
      this.loadLatest();
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
    this.loadLatest();
    this.loadTitles();
  }

  loadLatest = () => {
    this.offerService.getLatestOffers(this.currentTrack).subscribe((res) => {
      this.latestSubmissions = res.content.map((o) => ({
        ...o,
        createdAt: new Date(o.createdAt),
      }));
    });
  };

  loadTitles = () => {
    this.offerService.getTitles(7).subscribe((res) => {
      this.jobs = res.content;
    });
  };
}
