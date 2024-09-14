import express from "express"
import validateRequest from "../../middleware/validateRequest";
import { FaciltyValidation } from "./facility.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constance";
import { FacilityControllers } from "./faculty.controller";

const router = express.Router();

router.post("/", 
    auth(USER_ROLE.admin),
    validateRequest(FaciltyValidation.createFacilityValidationSchema),
    FacilityControllers.createFacility
)

router.get("/", 
    FacilityControllers.getAllFacility
)

router.put("/:id", 
    auth(USER_ROLE.admin),
    validateRequest(FaciltyValidation.updateFacilityValidationSchema),
    FacilityControllers.updateFacilities
)

router.delete("/:id",
    auth(USER_ROLE.admin),
    FacilityControllers.deleteFacility
)

export const FacilityRoutes = router;