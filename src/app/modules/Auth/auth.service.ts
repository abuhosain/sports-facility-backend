import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { ILoginUser, IUser } from './auth.interface'
import { User } from './auth.model'
import { createToken } from './auth.utils'
import config from '../../config'

const signUpUserIntoDb = async (payload: IUser) => {
  const result = await User.create(payload);
  return result
}

const loginUser = async (payload: ILoginUser) => {
  const user  = await User.isUserExistsByEmail(payload.email);

  // check if user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This  user is not found')
  }

  // cheking if the password is correct
  if (!(await User.isUserPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'This  user password is not match')
  }

  
  

  // access Granted token and refresh token;
  //   create token and sent to the client

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  )
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refrsh_expire_in as string,
  )

  const {email} = user;

  const userData =  await User.findOne({email});


  return {
    accessToken,
    refreshToken,
    user : userData
  }
}

export const AuthServices = { 
  signUpUserIntoDb,
  loginUser,
}
