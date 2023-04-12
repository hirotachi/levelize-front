import { Component } from '@angular/core';
import { PaginatorEvent } from '@components/paginator/paginator.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '@services/offer.service';
import { MinMaxResponse, Offer } from '../../types';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-title-offers',
  templateUrl: './title-offers.component.html',
  styleUrls: ['./title-offers.component.scss'],
})
export class TitleOffersComponent {
  pageSize: number = 5;
  page: number = 0;
  title: string = '';

  offers: Offer[] = [];
  totalPages: number = 0;
  search: string = '';

  ranges: MinMaxResponse = {
    min: 0,
    max: 0,
    count: 0,
    total: 0,
  };

  constructor(
    private router: Router,
    private offerService: OfferService,
    private route: ActivatedRoute
  ) {
    combineLatest([this.route.queryParams, this.route.paramMap]).subscribe(
      ([queryParams, paramMap]) => {
        this.page = (queryParams['page'] ?? 1) - 1;
        this.pageSize = queryParams['size'] ?? 5;
        this.title = paramMap.get('title') || '';
        this.search = queryParams['search'] || '';
        this.loadOffers(this.page, this.pageSize, this.title, this.search);
        this.loadMinMax(this.title);
      }
    );
  }

  loadMinMax = (title: string, location: string = '') => {
    this.offerService.getMinMax(title, location).subscribe((res) => {
      this.ranges = res;
    });
  };
  loadOffers = (page: number, size: number, title: string, search: string) => {
    this.offerService
      .getOffersByTitle(page, size, title, search)
      .subscribe((res) => {
        this.offers = res.content.map((o) => ({
          ...o,
          createdAt: new Date(o.createdAt),
          startDate: new Date(o.startDate),
        }));
        this.totalPages = res.totalPages;
      });
  };

  onPageChange = (page: PaginatorEvent) => {
    this.router.navigate([], {
      queryParams: { page: page.page, size: page.pageSize },
      queryParamsHandling: 'merge',
    });
  };

  onSearch = (search: string) => {
    const newSearch = search.trim() || undefined;
    this.router.navigate([], {
      queryParams: { search: newSearch },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  };
}
