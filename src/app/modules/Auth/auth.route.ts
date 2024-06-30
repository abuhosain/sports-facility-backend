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

export const AuthRoutes = router
