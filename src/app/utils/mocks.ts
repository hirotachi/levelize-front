import { LocationType, SalarySubmission } from '../types';

export const salarySubmissionMock: SalarySubmission = {
  id: '1',
  company: {
    logo: 'https://i.imgur.com/gPA9jT6.png',
    name: 'ByteDance',
    url: 'https://www.bytedance.com/en/',
  },
  compensation: {
    baseSalary: 127894,
    bonus: 17534,
    currency: 'USD',
    stock: 7534,
  },
  location: {
    city: 'Singapore',
    country: 'Singapore',
    type: LocationType.OFFICE,
  },
  startDate: new Date(),
  title: 'Technical Lead',
  createdAt: new Date(),
};
