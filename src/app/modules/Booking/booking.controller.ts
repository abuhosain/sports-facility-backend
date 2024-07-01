/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'

const createBookings = catchAsync(async (req, res) => {
  const payload = req.body
  const user : any = req.user
  const result = await BookingServices.createdBookingIntoDB(user , payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  })
})

//   RETRIVE ALL BOOKING
const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB();
    if (result.length === 0) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'No Data Found',
        data: result,
      });
    }
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking retrieved successfully',
      data: result,
    });
  });
  

  //   retrive all booking for user
const getUserBookings = catchAsync(async (req, res) => {
    const user : any = req.user;
    const result = await BookingServices.getUserBookingsFromDB(user);
  
    if (result.length === 0) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'No Data Found',
        data: result,
      });
    }
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking retrieved successfully',
      data: result,
    });
  });

export const BookingControllers = {
    createBookings,
    getAllBookings,
    getUserBookings
}