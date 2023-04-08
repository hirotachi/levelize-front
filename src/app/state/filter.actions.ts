import { createAction } from '@ngrx/store';
import { FilterState } from './filter.reducer';

export const setFilter = createAction(
  '[Filter] Set Filter',
  (filter: FilterState) => ({ filter })
);

export const setCurrentTrack = createAction(
  '[Filter] Set Current Track',
  (currentTrack: string) => ({ currentTrack })
);

export const setCurrentLocation = createAction(
  '[Filter] Set Current Location',
  (currentLocation: string) => ({ currentLocation })
);
