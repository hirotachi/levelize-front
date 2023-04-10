import { Component } from '@angular/core';
import { salarySubmissionMock } from '../../utils/mocks';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent {
  protected readonly salarySubmissionMock = salarySubmissionMock;
}
