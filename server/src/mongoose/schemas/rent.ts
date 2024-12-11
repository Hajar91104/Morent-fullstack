import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const rentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  showInRecommendation: {
    type: Boolean,
    default: false,
  },
  pickUpLocation: {
    type: Types.ObjectId,
    ref: "Location",
    required: true,
  },
  dropOffLocations: {
    type: [Types.ObjectId],
    ref: "Location",
    required: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  fuel: {
    type: Number,
    required: true,
  },
  gearBox: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  discount: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  reviews: {
    type: [Types.ObjectId],
    ref: "Review",
    default: [],
  },
});

rentSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Rent", rentSchema);
