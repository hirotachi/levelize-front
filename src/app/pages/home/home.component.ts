import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterState, selectFilter } from '@state/filter.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '@services/offer.service';
import { JobLocation, MinMaxResponse, Offer } from '../../types';
import { PaginatorEvent } from '@components/paginator/paginator.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentLocation: string = '';
  currentTrack: string = '';

  locations: string[] = [];
  pageSize: number = 5;
  page: number = 0;

  offers: Offer[] = [];
  totalPages: number = 0;

  ranges: MinMaxResponse = {
    min: 0,
    max: 0,
    count: 0,
    total: 0,
  };

  constructor(
    private store: Store<{ filter: FilterState }>,
    private router: Router,
    private offerService: OfferService,
    private route: ActivatedRoute
  ) {
    this.store.select(selectFilter).subscribe((filter) => {
      this.currentLocation = filter.currentLocation;
      this.currentTrack = filter.currentTrack;
    });

    this.route.queryParams.subscribe((val) => {
      this.page = (val['page'] ?? 1) - 1;
      this.pageSize = val['size'] ?? 5;
      this.loadOffers();
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

  loadOffers = () => {
    this.offerService
      .getOffers(this.page, this.pageSize, this.currentLocation)
      .subscribe((res) => {
        this.offers = res.content.map((o) => ({
          ...o,
          createdAt: new Date(o.createdAt),
          startDate: new Date(o.startDate),
        }));
        this.totalPages = res.totalPages;
      });
  };

  loadMinMax = () => {
    const location = this.currentLocation;
    const title = this.currentTrack;
    this.offerService.getMinMax(title, location).subscribe((res) => {
      this.ranges = res;
    });
  };

  onPageChange = (page: PaginatorEvent) => {
    this.router.navigate([], {
      queryParams: { page: page.page, size: page.pageSize },
      queryParamsHandling: 'merge',
    });
  };

  ngOnInit(): void {
    this.loadLocations();
    this.loadOffers();
    this.loadMinMax();
  }
}
