import { Component, Input, OnInit } from '@angular/core';
import { SalarySubmission } from '../../types';

@Component({
  selector: 'app-submission-details',
  templateUrl: './submission-details.component.html',
  styleUrls: ['./submission-details.component.scss'],
})
export class SubmissionDetailsComponent implements OnInit {
  @Input() submission!: SalarySubmission;

  years = {
    'Years At Company': 3,
    'Years Of Experience': 5,
    'Years At Level': 2,
  };

  calculations = {
    'Base Salary': 127894,
    'Stock/yr': 7534,
    Bonus: 17534,
  };

  detailsFields: { icon: string; value: string }[] = [];

  ngOnInit(): void {
    this.detailsFields = [
      {
        icon: 'location',
        value: `${this.submission?.location.city}, ${
          this.submission?.location.state ?? ''
        } ${this.submission?.location.country}`,
      },
      {
        icon: 'time',
        value: `Employee as of ${this.submission?.startDate.toLocaleDateString()}`,
      },
      {
        icon: 'bag',
        value: this.submission?.location.type,
      },
    ];
  }

  totalCompensation() {
    return (
      this.submission?.compensation.baseSalary ??
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
}
