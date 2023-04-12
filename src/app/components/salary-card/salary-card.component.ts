import { Component, Input } from '@angular/core';
import { MinMaxResponse } from '../../types';

@Component({
  selector: 'app-salary-card',
  templateUrl: './salary-card.component.html',
  styleUrls: ['./salary-card.component.scss'],
})
export class SalaryCardComponent {
  @Input() ranges: MinMaxResponse = {
    min: 0,
    max: 0,
    count: 0,
    total: 0,
  };

  @Input() title: string = '';

  protected readonly Math = Math;
}
