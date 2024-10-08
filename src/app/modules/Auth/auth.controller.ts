import { AuthServices } from './auth.service'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
 

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

const signupAdmin = catchAsync(async (req, res) => {
  const user = req.body
  const result = await AuthServices.signUpAdminIntoDb(user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => { 
    const result = await AuthServices.loginUser(req.body);
    const {accessToken, user} = result;
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        token : accessToken,
        message: 'User is logged succesfully',
        data: user,
      })
})



const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
   
  const result = await AuthServices.getRefreshToken(refreshToken);
 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});


export const AuthControllers = {
  signupUser,
  loginUser,
  refreshToken,
  signupAdmin
}
