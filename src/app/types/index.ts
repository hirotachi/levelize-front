export type SalarySubmission = {
  id: string;
  title: string;
  company: Company;
  compensation: Compensation;
  startDate: Date;
  location: JobLocation;
  createdAt: Date;
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

// enums
export enum LocationType {
  OFFICE = 'office',
  REMOTE = 'remote',
  HYBRID = 'hybrid',
}
