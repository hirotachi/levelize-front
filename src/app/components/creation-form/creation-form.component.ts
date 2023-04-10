import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputProps } from '@components/custom-input/custom-input.component';
import { UtilsService } from '@services/utils.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss'],
})
export class CreationFormComponent implements OnInit {
  constructor(private utilsService: UtilsService) {}

  arrangements = ['remote', 'hybrid', 'in-office'];
  sections: { title: string; fields: ({ field: string } & InputProps)[] }[] = [
    {
      title: 'Company & Title Information',
      fields: [
        {
          field: 'company',
          label: 'Company',
          value: new FormControl('', [Validators.required]),
          hintText: 'The company you received the offer from',
          placeholder: 'Google',
        },
        {
          field: 'title',
          label: 'Title',
          value: new FormControl('', [Validators.required]),
          hintText: 'Your official title. e.g. Software Engineer',
          placeholder: 'Software Engineer',
          suggestions: ['Software Engineer', 'Software Developer'],
        },
      ],
    },
    {
      title: 'Work Experience and Location',
      fields: [
        {
          field: 'yearsAtCompany',
          label: 'Years At the Company',
          value: new FormControl(0, [
            Validators.required,
            this.utilsService.onlyNumbersValidator(),
          ]),
          hintText: 'Total years spent at the company for selected role',
          placeholder: '3',
        },
        {
          field: 'yearsOfExperience',
          label: 'Years of experience',
          value: new FormControl(0, [
            Validators.required,
            this.utilsService.onlyNumbersValidator(),
          ]),
          hintText: 'Total years of experience in this field',
          placeholder: '7',
        },
        {
          field: 'location',
          label: 'Location',
          value: new FormControl('', [Validators.required]),
          hintText: 'City, State, Country, example: London, EN, United Kingdom',
          placeholder: 'Safi, MA',
        },
        {
          field: 'arrangement',
          label: 'Arrangement',
          type: 'select',
          value: new FormControl(this.arrangements[0], [Validators.required]),
          hintText: ` hybrid What is your permanent work arrangement with your company? Only select Hybrid if your workplace has designated days to be in office on a weekly or bi-weekly basis.`,
          suggestions: this.arrangements,
        },
      ],
    },
    {
      title: 'Compensation Details',
      fields: [
        {
          field: 'base',
          label: 'Base Salary',
          value: new FormControl(100000, [
            Validators.required,
            this.utilsService.onlyNumbersValidator(),
          ]),
          placeholder: '100000',
        },
        {
          field: 'stock',
          label: 'Stock/yr',
          value: new FormControl(0, [this.utilsService.onlyNumbersValidator()]),
          placeholder: '0',
        },
        {
          field: 'bonus',
          label: 'Bonus/yr',
          value: new FormControl(0, [this.utilsService.onlyNumbersValidator()]),
          placeholder: '0',
        },
      ],
    },
  ];

  complete = false;
  isComplete() {
    return this.sections
      .flatMap((section) => section.fields)
      .every((field) => {
        return field.value.valid;
      });
  }

  submit() {
    if (!this.isComplete()) {
      return;
    }
    const data = this.sections
      .flatMap((section) => section.fields)
      .reduce((acc, field) => {
        // @ts-ignore
        acc[field.field] = field.value.value;
        return acc;
      }, {});
    console.log(data);
  }
  ngOnInit(): void {
    const allFieldObservables = this.sections.flatMap((section) =>
      section.fields.map((field) => field.value.valueChanges)
    );

    const checkCompleteness = () => {
      this.complete = this.isComplete();
    };

    // Check completeness on initialization to account for default values
    checkCompleteness();

    // Update completeness based on value changes
    merge(...allFieldObservables).subscribe(() => {
      checkCompleteness();
    });
  }
}
