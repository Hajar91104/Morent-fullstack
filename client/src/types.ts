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
  name: string;
  fuel: number;
  gearBox: string;
  price: number;
  description: string;
  capacity: number;
  createdAt: string;
  currency: string;
  discount: number;
  category: Category;
  dropOffLocations: Location[];
  images: string[];
  total: number;
  pickUpLocation: Location;
  showInRecommendation: boolean;
  reviews: Review[];
};
export type Category = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};
export type Reservation = {
  billing: {
    name: string;
    phoneNumber: string;
    address: string;
    townCity: string;
  };
  createdAt: string;
  dropOffLocations: string;
  endDate: string;
  id: string;
  pickUpLocation: string;
  rent: Rent | string;
  startDate: string;
  status: ReservationStatus;
  total: number;
  updatedAt: string;
  user: string;
  _id: string;
  hasReview: boolean;
};
export type Review = {
  author: User;
  content: string;
  createdAt: string;
  id: string;
  rating: number;
  rent: Rent;
  status: ReviewStatus;
  _id: string;
};
export type Conversation = {
  userName: string;
  userEmail: string;
  userId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  _id: string;
};
export type Message = {
  text: string;
  userId: string;
  userName: string;
  conversation: Conversation | string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};
export type SelectOption = {
  value: string;
  label: string;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}
export enum ReservationStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Canceled = "canceled",
}
export enum ReviewStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}
