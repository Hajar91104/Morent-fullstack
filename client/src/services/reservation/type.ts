import { Reservation, ReservationStatus } from "@/types";

export type CreateReservationRequestPayload = {
  billingAddress: string;
  billingTownCity: string;
  endDate: string;
  dropOffLocations: string;
  billingName: string;
  billingPhoneNumber: string;
  startDate: string;
  pickUpLocation: string;
  rentId: string;
};
export type CreateReservationResponseType = {
  item?: Reservation;
  message: string;
};
export type ChangeStatusRequestPayload = {
  id: string;
  status: ReservationStatus.Approved | ReservationStatus.Rejected;
};
