import { NextFunction, Request, Response } from "express"
import { IUserRole } from "../modules/Auth/auth.interface"
import catchAsync from "../utils/catchAsynch"
import AppError from "../errors/AppError"
import httpStatus from "http-status"
import config from "../config"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "../modules/Auth/auth.model"

const auth = (...requirdRoles: IUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not authorized')
      }
  
      // checkin if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      
      const { role, email, } = decoded;
      const user = await User.isUserExistsByEmail(email)

      console.log("login:",user)
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This is user is not found')
      }
  
     
  
      if (requirdRoles && !requirdRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not authorized')
      }
      
      req.user = decoded as JwtPayload;
      next()
  
    })
  }

  export default auth