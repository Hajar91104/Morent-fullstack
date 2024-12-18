import axiosInstance from "../axiosInstance";
import { CreateReviewRequestPayload } from "./type";

const create = async (data: CreateReviewRequestPayload) => {
  return await axiosInstance.post("/review", data);
};

const reviewService = { create };

export default reviewService;
