import { Schema } from "express-validator";

export const conversationSchema: Schema = {
  userId: {
    in: ["body"],
    isString: {
      errorMessage: "User ID must be a string",
    },
    optional: true,
  },
  userName: {
    in: ["body"],
    isString: {
      errorMessage: "Username must be a string",
    },
    optional: true,
  },
  userEmail: {
    in: ["body"],
    isString: {
      errorMessage: "User email must be a string",
    },
    optional: true,
  },
};
