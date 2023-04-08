import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-salary-card',
  templateUrl: './salary-card.component.html',
  styleUrls: ['./salary-card.component.scss'],
})
export class SalaryCardComponent {
  total: number = 123564;
  ranges = {
    low: 12,
    mid: 5345,
    high: 6546546,
  };

  @Input() title: string = '';
}
