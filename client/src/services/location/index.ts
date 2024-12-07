import axiosInstance from "../axiosInstance";
import { GetAllLocationsResponseType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllLocationsResponseType>("/location");
};

const locationService = { getAll };

export default locationService;
