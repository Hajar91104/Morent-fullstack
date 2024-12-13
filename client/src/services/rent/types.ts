import { Rent } from "@/types";

export type GetAllRequestQueryData = {
  type?: "recommended" | "popular";
  take?: number;
  skip?: number;
  capacity?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  categoryId?: string;
  pickup_location?: string;
  pickup_date?: string;
  pickup_time?: string;
  dropoff_location?: string;
  dropoff_date?: string;
  dropoff_time?: string;
};
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
