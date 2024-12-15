import { Rent } from "@/types";

export type GetAllRentsResponseType = {
  items: Rent[];
  message: string;
  total: number;
  take: number;
  skip: number;
};
export type GetByIdRentResponseType = {
  item: Rent;
  message: string;
};
export type RentRequestPayload = {
  name: string;
  fuel: number;
  gearBox: string;
  price: number;
  description: string;
  capacity: number;
  discount: number;
  categoryId: string;
  dropOffLocations: string[];
  images?: File[];
  pickUpLocation: string;
  showInRecommendation: boolean;
};
