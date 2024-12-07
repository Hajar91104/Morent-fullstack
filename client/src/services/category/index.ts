import axiosInstance from "../axiosInstance";
import { GetAllCategoriesResponseType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllCategoriesResponseType>("/category");
};

const categoryService = { getAll };

export default categoryService;
