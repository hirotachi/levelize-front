import { Component, Input } from '@angular/core';
import { Offer } from '../../../types';
import { SubmissionsService } from '@services/submissions.service';
import { salarySubmissionMock } from '../../../utils/mocks';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
})
export class SubmissionComponent {
  @Input() submission: Offer = salarySubmissionMock;

  constructor(
    public submissionsStore: SubmissionsService,
    public utils: UtilsService
  ) {}
}
