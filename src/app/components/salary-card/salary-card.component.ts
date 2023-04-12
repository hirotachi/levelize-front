import { Component, Input } from '@angular/core';
import { MinMaxResponse } from '../../types';
import { UtilsService } from '@services/utils.service';

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
  constructor(public utils: UtilsService) {}

  @Input() title: string = '';

  protected readonly Math = Math;
}
