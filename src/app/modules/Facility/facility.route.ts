import exprss from "express"
import validateRequest from "../../middleware/validateRequest";
import { FaciltyValidation } from "./facility.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constance";
import { FacilityControllers } from "./faculty.controller";

const router = exprss.Router();

router.post("/", 
    auth(USER_ROLE.admin),
    validateRequest(FaciltyValidation.createFacilityValidationSchema),
    FacilityControllers.createFacility
)

router.put("/:id", 
    auth(USER_ROLE.admin),
    validateRequest(FaciltyValidation.updateFacilityValidationSchema),
    FacilityControllers.updateFacilities
)

export const FacilityRoutes = router;