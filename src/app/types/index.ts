export type Offer = {
  id: string;
  title: string;
  company: Company;
  compensation: Compensation;
  startDate: Date;
  location: JobLocation;
  createdAt: Date;
  tag: string;
  experience: Experience;
};

export type Compensation = {
  base: number;
  bonus: number;
  stock: number;
  currency: string;
};

export type Experience = {
  total: number;
  atCompany: number;
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

export type PageableResponse<T> = {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type MinMaxResponse = {
  min: number;
  max: number;
  total: number;
  count: number;
};
