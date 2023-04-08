import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterState } from '@state/filter.reducer';
import { setFilter } from '@state/filter.actions';

export function initFromQueryParams(
  store: Store<{ filter: FilterState }>,
  route: ActivatedRoute,
  router: Router
) {
  return () => {
    route.queryParams.subscribe((params) => {
      if (!params['location'] && !params['track']) {
        return;
      }
      store.dispatch(
        setFilter({
          currentLocation: params['location'] || '',
          currentTrack: params['track'] || '',
        })
      );
    });
  };
}
