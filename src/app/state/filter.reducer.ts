import { createReducer, createSelector, on } from '@ngrx/store';
import {
  setCurrentLocation,
  setCurrentTrack,
  setFilter,
} from './filter.actions';

export const initialFilterState = {
  currentLocation: '',
  currentTrack: '',
};

export type FilterState = typeof initialFilterState;

export const filterReducer = createReducer(
  initialFilterState,
  on(setFilter, (state, { filter }) => ({ ...state, ...filter })),
  on(setCurrentTrack, (state, { currentTrack }) => ({
    ...state,
    currentTrack,
  })),
  on(setCurrentLocation, (state, { currentLocation }) => ({
    ...state,
    currentLocation,
  }))
);

// selectors

export const selectFilter = (state: { filter: FilterState }) => state.filter;

export const selectCurrentLocation = createSelector(
  selectFilter,
  (filter: FilterState) => filter.currentLocation
);

export const selectCurrentTrack = createSelector(
  selectFilter,
  (filter: FilterState) => filter.currentTrack
);
