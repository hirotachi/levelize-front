import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterState, selectFilter } from '../state/filter.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentLocation: string = '';
  currentTrack: string = '';

  inputLabel = '';

  constructor(
    private store: Store<{ filter: FilterState }>,
    private router: Router
  ) {
    this.store.select(selectFilter).subscribe((filter) => {
      this.currentLocation = filter.currentLocation;
      this.currentTrack = filter.currentTrack;
    });
  }

  handleLocationChange = (location: string) => {
    this.router.navigate([], {
      queryParams: { location: location },
      queryParamsHandling: 'merge',
    });
  };
}
