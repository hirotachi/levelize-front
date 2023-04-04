import { Injectable } from '@angular/core';
import { formatDistanceToNowStrict } from 'date-fns';
import { Compensation } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  calcTotalCompensation(compensation: Compensation): number {
    return compensation.baseSalary + compensation.bonus + compensation.stock;
  }

  relativeTime(date: Date) {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }
}
