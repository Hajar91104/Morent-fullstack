import { Router } from "express";
import rentController from "../controllers/rent";
import validateSchema from "../middlewares/validator";
import { createRentSchema, getAllRentSchema } from "../validation/rent";
import { authorize } from "../middlewares/user";
import upload from "../middlewares/multer";

const router = Router();

router.get("/", validateSchema(getAllRentSchema), rentController.getAll);
router.post(
  "/",
  authorize({ isAdmin: true }),
  upload.array("images", 8),
  validateSchema(createRentSchema),
  rentController.create
);

export default router;
