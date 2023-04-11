import { Component, OnInit } from '@angular/core';
import { salarySubmissionMock } from '../../utils/mocks';
import { Offer } from '../../types';
import { OfferService } from '@services/offer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  offer: Offer = salarySubmissionMock;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute
  ) {}

  loadOffer = (id: number) => {
    this.offerService.getOffer(id).subscribe((res) => {
      this.offer = res;
      this.offer.createdAt = new Date(this.offer.createdAt);
      this.offer.startDate = new Date(this.offer.startDate);
    });
  };
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.loadOffer(id);
    });
  }
}
