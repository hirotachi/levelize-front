import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterState, selectFilter } from '../state/filter.reducer';
import { Router } from '@angular/router';
import { OfferService } from '@services/offer.service';
import { JobLocation } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentLocation: string = '';
  currentTrack: string = '';

  inputLabel = '';

  locations: string[] = [];

  constructor(
    private store: Store<{ filter: FilterState }>,
    private router: Router,
    private offerService: OfferService
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

  loadLocations = () => {
    this.offerService.getLocations().subscribe((res) => {
      this.locations = [];
      const existSet = new Set();
      res.content.forEach((location: JobLocation) => {
        if (existSet.has(location.country)) {
          return;
        }
        existSet.add(location.country);
        this.locations.push(location.country);
      });
    });
  };

  ngOnInit(): void {
    this.loadLocations();
  }
}
