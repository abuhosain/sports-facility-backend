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

router.get('/', auth("admin"), BookingControllers.getAllBookings);

router.get('/user',auth("user"),  BookingControllers.getUserBookings);

router.delete(
    '/:id',
    auth(USER_ROLE.user),
    BookingControllers.cancelBookings,
  );

  router.get("/:id", auth(USER_ROLE.user), BookingControllers.getSingleUserBooking)

export const BookingRoutes = router;