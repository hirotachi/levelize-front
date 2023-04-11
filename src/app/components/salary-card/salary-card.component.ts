import { Component, Input, OnInit } from '@angular/core';
import { MinMaxResponse } from '../../types';
import { OfferService } from '@services/offer.service';
import { Store } from '@ngrx/store';
import { FilterState, selectFilter } from '@state/filter.reducer';

@Component({
  selector: 'app-salary-card',
  templateUrl: './salary-card.component.html',
  styleUrls: ['./salary-card.component.scss'],
})
export class SalaryCardComponent implements OnInit {
  filters: FilterState = {
    currentLocation: '',
    currentTrack: '',
  };
  ranges: MinMaxResponse = {
    min: 0,
    max: 0,
    count: 0,
    total: 0,
  };
  constructor(
    private offerService: OfferService,
    private store: Store<{ filter: FilterState }>
  ) {
    this.store.select(selectFilter).subscribe((val) => {
      this.filters = val;
      this.loadMinMax();
    });
  }

  @Input() title: string = '';

  loadMinMax = () => {
    const location = this.filters.currentLocation;
    const title = this.filters.currentTrack;
    this.offerService.getMinMax(title, location).subscribe((res) => {
      this.ranges = res;
    });
  };

  ngOnInit(): void {
    this.loadMinMax();
  }

  protected readonly Math = Math;
}
