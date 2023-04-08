import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent {
  @Input() text = 'Report';
  @Input() placeholder = 'What is the issue?';
  @Input() SubmitUrl = '';

  message = '';

  isOpened = false;

  toggle() {
    this.isOpened = !this.isOpened;
  }

  send() {
    // todo: send message
    this.message = '';
    this.isOpened = false;
  }
}
