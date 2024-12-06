import { User } from "@/types";

export type RegisterRequestPayloadType = {
  name: String;
  surname: String;
  email: String;
  password: String;
};

export type LoginRequestPayloadType = {
  email: String;
  password: String;
};

export type AuthResponseType = {
  message: String;
  user: User;
};
