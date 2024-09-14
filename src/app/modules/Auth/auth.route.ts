import express from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { AuthVallidation } from './auth.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './auth.constance'

const router = express.Router()
// for user
router.post(
  '/signup',
  validateRequest(AuthVallidation.createUserValidationSchema),
  AuthControllers.signupUser,
)
// for admin
router.post(
  '/signup/admin',
  auth(USER_ROLE.admin),
  validateRequest(AuthVallidation.createUserValidationSchema),
  AuthControllers.signupUser,
)

router.post("/login",
    validateRequest(AuthVallidation.loginValidationSchema),
    AuthControllers.loginUser
)

// refresh token
router.post(
  '/refresh-token',
  validateRequest(AuthVallidation.refreshTokenValidationSchema),
   AuthControllers.refreshToken
);


export const AuthRoutes = router
