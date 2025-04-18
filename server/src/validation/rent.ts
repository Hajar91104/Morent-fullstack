import { Schema } from "express-validator";
import mongoose from "mongoose";

export const getAllRentSchema: Schema = {
  type: {
    in: ["query"],
    matches: {
      options: [/^(recommended|popular)$/],
      errorMessage: "Type must be either 'recommended' or 'popular'",
    },
    optional: true,
  },
  take: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  skip: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  search: {
    in: ["query"],
    isString: true,
    optional: true,
  },
  category: {
    in: ["query"],
    optional: true,
  },
  capacity: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  min_price: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  max_price: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  pickup_location: {
    in: ["query"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
  pickup_date: {
    in: ["query"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
  pickup_time: {
    in: ["query"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
  dropoff_location: {
    in: ["query"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
  dropoff_date: {
    in: ["query"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
  dropoff_time: {
    in: ["query"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
};

export const createRentSchema: Schema = {
  name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  price: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  discount: {
    in: ["body"],
    isNumeric: true,
    optional: true,
  },
  capacity: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  categoryId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  showInRecommendation: {
    in: ["body"],
    isBoolean: true,
    optional: true,
  },
  pickUpLocation: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  dropOffLocations: {
    in: ["body"],
    isArray: true,
    notEmpty: true,
  },
  fuel: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  gearBox: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  currency: {
    in: ["body"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
  files: {
    custom: {
      options: (_, { req }) => {
        if (!req.files || req.files.length === 0) {
          throw new Error("images not uploaded!");
        }
        return true;
      },
    },
  },
};
export const editRentSchema: Schema = {
  name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  price: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  discount: {
    in: ["body"],
    isNumeric: true,
    optional: true,
  },
  capacity: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  categoryId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  showInRecommendation: {
    in: ["body"],
    isBoolean: true,
    optional: true,
  },
  pickUpLocation: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  dropOffLocations: {
    in: ["body"],
    isArray: true,
    notEmpty: true,
  },
  fuel: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  gearBox: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  currency: {
    in: ["body"],
    isString: true,
    optional: true,
    notEmpty: true,
  },
};
