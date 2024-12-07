import axiosInstance from "../axiosInstance";
import { GetAllRentsResponseType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllRentsResponseType>("/rent");
};

const rentService = { getAll };

export default rentService;
