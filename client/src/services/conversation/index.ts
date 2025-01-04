import axiosInstance from "../axiosInstance";
import { getAllConversationsType, GetConversationType } from "./types";

const getAll = async () => {
  return await axiosInstance.get<getAllConversationsType>("/conversation");
};
const getByUserId = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get<GetConversationType>(
    `/conversation/user/${userId}`
  );
};
const getById = async ({ id }: { id: string }) => {
  return await axiosInstance.get<GetConversationType>(`/conversation/${id}`);
};
const create = async (data: {
  userId: string;
  userName: string;
  userEmail: string;
}) => {
  return await axiosInstance.post(`/conversation`, data);
};
const conversationService = {
  getByUserId,
  getById,
  create,
  getAll,
};

export default conversationService;
