import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Offer } from '../types';
import { salarySubmissionMock } from '../utils/mocks';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  private readonly _submissions = new BehaviorSubject<Offer[]>(
    Array.from({ length: 10 }).map((v, i) => ({
      ...salarySubmissionMock,
      title: `${salarySubmissionMock.title} ${i}`,
      id: i.toString(),
    }))
  );

  readonly submissions$: Observable<Offer[]> = this._submissions.asObservable();

  set submissions(submissions: Offer[]) {
    this._submissions.next(submissions);
  }

  get submissions(): Offer[] {
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

  getLatestSubmissions(): Observable<Offer[]> {
    // todo fetch from api
    return this.submissions$;
  }

  getSubmissions(limit: number, page: number): Observable<Offer[]> {
    // todo fetch from api
    return this.submissions$;
  }
}
