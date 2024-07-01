import express from "express";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constance";
import { BookingControllers } from "./booking.controller";
import { BookingValidation } from "./booking.validation";
const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.createBokingSchemaValidation),
  auth(USER_ROLE.user),
  BookingControllers.createBookings,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

export const BookingRoutes = router;