import { AuthServices } from './auth.service'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import config from '../../config'

const signupUser = catchAsync(async (req, res) => {
  const user = req.body
  const result = await AuthServices.signUpUserIntoDb(user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => { 
    const result = await AuthServices.loginUser(req.body);
    const {accessToken,refreshToken, user} = result;
    
    res.cookie("refreshToken", refreshToken, {
      secure : config.NODE_ENV === "production",
      httpOnly : true
  })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        token : accessToken,
        message: 'User is logged succesfully',
        data: user,
      })
})


export const AuthControllers = {
  signupUser,
  loginUser
}
