import { Router } from "express";
import reviewController from "../controllers/review";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import {
  changeStatusSchema,
  createReservationSchema,
} from "../validation/reservation";
import { createReviewSchema } from "../validation/review";

const router = Router();

router.get("/", authorize({ isAdmin: true }), reviewController.getAll);
router.post(
  "/",
  authorize({}),
  validateSchema(createReviewSchema),
  reviewController.create
);
export default router;
