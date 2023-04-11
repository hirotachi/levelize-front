import { Component, Input } from '@angular/core';
import { Offer } from '../../types';

@Component({
  selector: 'app-submission-details',
  templateUrl: './submission-details.component.html',
  styleUrls: ['./submission-details.component.scss'],
})
export class SubmissionDetailsComponent {
  @Input() submission!: Offer;

  detailsFields = [
    {
      icon: 'location',
      value: (s: Offer) =>
        `${s.location.city}, ${s.location.state ?? ''} ${s.location.country}`,
    },
    {
      icon: 'time',
      value: (s: Offer) =>
        `Employee as of ${s?.startDate.toLocaleDateString()}`,
    },
    {
      icon: 'bag',
      value: (s: Offer) => s?.location.type,
    },
  ];

  years = {
    'Years At Company': (s: Offer) => s?.experience.atCompany.toString(),
    'Years Of Experience': (s: Offer) => s?.experience.total.toString(),
    'Years At Level': (s: Offer) => s?.experience.atCompany.toString(),
  };
  calculations = {
    'Base Salary': (s: Offer) => s?.compensation.base.toString(),
    'Stock/yr': (s: Offer) => s?.compensation.stock.toString(),
    Bonus: (s: Offer) => s?.compensation.bonus.toString(),
  };

  totalCompensation() {
    return (
      this.submission?.compensation.base ??
      0 + this.submission?.compensation.bonus ??
      0 + this.submission?.compensation.stock ??
      0
    );
  }

  showCalculation: boolean = false;
  toggleCalculation() {
    this.showCalculation = !this.showCalculation;
  }

  share() {
    if (!navigator.share) {
      return;
    }
    navigator
      .share({
        title: 'Share salary submission',
        text: 'Check out this salary submission on Levelize',
        url: `/offer/${this.submission.id}`,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }

  protected readonly Object = Object;
}
