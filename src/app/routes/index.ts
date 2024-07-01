import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { FacilityRoutes } from "../modules/Facility/facility.route";
import {  BookingCheckerRoutes } from "../modules/BookingCheck/bookingCheak.route";
import { BookingRoutes } from "../modules/Booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/facility",
    route: FacilityRoutes,
  },
  {
    path: '/check-availability',
    route: BookingCheckerRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
