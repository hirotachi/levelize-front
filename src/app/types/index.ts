export type SalarySubmission = {
  id: string;
  title: string;
  company: Company;
  compensation: Compensation;
  startDate: Date;
  location: JobLocation;
  createdAt: Date;
  tag: string;
};

export type Compensation = {
  baseSalary: number;
  bonus: number;
  stock: number;
  currency: string;
};

export type Company = {
  name: string;
  logo: string;
  url: string;
};

export type JobLocation = {
  city: string;
  state?: string;
  country: string;
  type: LocationType;
};

// props
export type LinkTrailLink = {
  label: string;
  url: string;
};

// enums
export enum LocationType {
  OFFICE = 'office',
  REMOTE = 'remote',
  HYBRID = 'hybrid',
}
