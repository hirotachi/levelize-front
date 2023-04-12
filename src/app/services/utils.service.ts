import { Injectable } from '@angular/core';
import { formatDistanceToNowStrict } from 'date-fns';
import { Compensation } from '../types';
import { AbstractControl, ValidatorFn } from '@angular/forms';

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

  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const valid = /^[0-9]*$/.test(value);
      return !valid ? { onlyNumbers: { value: control.value } } : null;
    };
  }

  formatMoney(num?: number, decimalPlaces: number = 0) {
    if (!num) return num;
    let result = num.toString();
    if (num >= 1000) {
      result = (num / 1000).toFixed(decimalPlaces) + 'k';
    }
    return result.toString();
  }
}
