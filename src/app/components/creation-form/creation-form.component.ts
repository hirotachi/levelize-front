import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputProps } from '@components/custom-input/custom-input.component';
import { UtilsService } from '@services/utils.service';
import { merge } from 'rxjs';
import { OfferService } from '@services/offer.service';
import { Offer } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss'],
})
export class CreationFormComponent implements OnInit {
  constructor(
    private utilsService: UtilsService,
    private offerService: OfferService,
    private router: Router
  ) {}

  arrangements = ['remote', 'hybrid', 'in-office'];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years = Array.from({ length: 5 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  sections: { title: string; fields: ({ field: string } & InputProps)[] }[] = [
    {
      title: 'Company & Title Information',
      fields: [
        {
          field: 'title',
          label: 'Title',
          value: new FormControl('', [Validators.required]),
          hintText: 'Your official title. e.g. Software Engineer',
          placeholder: 'Software Engineer',
          suggestions: ['Software Engineer', 'Software Developer'],
        },
        {
          field: 'company',
          label: 'Company',
          value: new FormControl('', [Validators.required]),
          hintText: 'The company you received the offer from',
          placeholder: 'Google',
        },
        {
          field: 'companyLogo',
          label: 'Company Logo',
          value: new FormControl(''),
          hintText: 'Logo of the company you received the offer from',
          placeholder: 'https://www.google.com/logo.png',
        },
        {
          field: 'companyUrl',
          label: 'Company Site',
          value: new FormControl(''),
          hintText: 'Site of the company you received the offer from',
          placeholder: 'https://www.google.com',
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
        {
          field: 'startMonth',
          label: 'Month',
          type: 'select',
          value: new FormControl(this.months[0], [Validators.required]),
          suggestions: this.months,
        },
        {
          field: 'startYear',
          label: 'Year',
          type: 'select',
          value: new FormControl(this.years[0], [Validators.required]),
          suggestions: this.years,
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
        {
          field: 'currency',
          label: 'Currency',
          value: new FormControl('USD', [Validators.required]),
          placeholder: 'USD',
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

  submit = () => {
    if (!this.isComplete()) {
      return;
    }
    const data: Record<string, any> = this.sections
      .flatMap((section) => section.fields)
      .reduce((acc, field) => {
        // @ts-ignore
        acc[field.field] = field.value.value;
        return acc;
      }, {});

    const locationsPattern = /([a-zA-Z]+),\s*([a-zA-Z]+)(\s*([a-zA-Z]+))?/;
    const location = data['location'].match(locationsPattern);
    const offer: Partial<Offer> = {
      title: data['title'],
      company: {
        logo: data['companyLogo'],
        name: data['company'],
        url: data['companyUrl'],
      },
      location: {
        city: location?.[1] ?? data['location'],
        state: location?.[3] ? location?.[2] ?? '' : '',
        country: location?.[3] ?? location?.[2] ?? '',
        type: data['arrangement'],
      },
      compensation: {
        base: data['base'],
        stock: data['stock'],
        bonus: data['bonus'],
        currency: data['currency'],
      },
      startDate: new Date(
        data['startYear'],
        this.months.indexOf(data['startMonth'])
      ),
      experience: {
        atCompany: data['yearsAtCompany'],
        total: data['yearsOfExperience'],
      },
    };

    this.offerService.createOffer(offer).subscribe((offer) => {
      this.router.navigate(['/offer', offer.id]);
    });
  };
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
