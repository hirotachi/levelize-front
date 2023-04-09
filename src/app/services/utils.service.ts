import { Injectable } from '@angular/core';
import { formatDistanceToNowStrict } from 'date-fns';
import { Compensation } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  calcTotalCompensation(compensation: Compensation): number {
    return compensation.base + compensation.bonus + compensation.stock;
  }

  relativeTime(date: Date) {
    if (formatDistanceToNowStrict(date) === '0 seconds') {
      return 'just now';
    }
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }
}
