import express from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { AuthVallidation } from './auth.validation'

const router = express.Router()

router.post(
  '/signup',
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
