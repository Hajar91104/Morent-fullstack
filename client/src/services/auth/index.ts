import axiosInstance from "../axiosInstance";
import {
  RegisterRequestPayloadType,
  AuthResponseType,
  LoginRequestPayloadType,
} from "./types";

const login = async (payload: LoginRequestPayloadType) => {
  return await axiosInstance.post<AuthResponseType>("/auth/login", payload);
};

const register = async (payload: RegisterRequestPayloadType) => {
  return await axiosInstance.post<AuthResponseType>("/auth/register", payload);
};

const logout = async () => {
  return await axiosInstance.post("/auth/logout");
};

const getCurrentUser = async () => {
  return await axiosInstance.get("/auth/current-user");
};

const authService = { login, register, logout, getCurrentUser };

export default authService;
