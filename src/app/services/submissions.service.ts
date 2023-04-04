import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SalarySubmission } from '../types';
import { salarySubmissionMock } from '../utils/mocks';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  private readonly _submissions = new BehaviorSubject<SalarySubmission[]>(
    Array.from({ length: 5 }).map((v, i) => ({
      ...salarySubmissionMock,
      id: i.toString(),
    }))
  );

  readonly submissions$: Observable<SalarySubmission[]> =
    this._submissions.asObservable();

  set submissions(submissions: SalarySubmission[]) {
    this._submissions.next(submissions);
  }

  get submissions(): SalarySubmission[] {
    return this._submissions.getValue();
  }

  addSubmission() {
    let lastSub = this.submissions[this.submissions.length - 1];
    const sub = {
      ...lastSub,
      id: (parseInt(lastSub.id) + 1).toString(),
    };
    this._submissions.next([...this._submissions.getValue(), sub]);
  }

  removeSubmission(id: string) {
    this._submissions.next(
      this._submissions.getValue().filter((s) => s.id !== id)
    );
  }
}