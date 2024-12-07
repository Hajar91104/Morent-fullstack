export type User = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isBlocked: boolean;
  createdAt: string;
  role: UserRole;
};

export type Location = {
  _id: string;
  createdAt: string;
  name: string;
};
export type Rent = {
  _id: string;
  capacity: number;
  category: Category;
  createdAt: string;
  currency: string;
  description: string;
  discount: number;
  dropOffLocation: Location[];
  fuel: string;
  gearBox: string;
  images: string[];
  name: string;
  pickUpLocation: Location;
  price: number;
  showInRecommendation: boolean;
};
export type Category = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};

export type SelectOption = {
  value: string;
  label: string;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}
