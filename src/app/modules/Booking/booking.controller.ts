/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'

const createBookings = catchAsync(async (req, res) => {
  const payload = req.body;
  const user : any = req.user;
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
  
    
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking retrieved successfully',
      data: result,
    });
  });

//   cancell bookings into db
  const cancelBookings = catchAsync(async (req, res) => {
    const id : string = req.params.id;
  
    const result = await BookingServices.cancellBookingFromDb(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking cancelled successfully',
      data: result,
    });
  });

  // single booking for user
  const getSingleUserBooking = catchAsync(async (req, res) => {
    const id : string = req.params.id;
    const result = await BookingServices.getSingleUserBookingsFromDB(id);
    sendResponse(res, {
      success : true,
      statusCode : httpStatus.OK,
      message : "Get single user booking successfully",
      data : result
    })
  })


export const BookingControllers = {
    createBookings,
    getAllBookings,
    getUserBookings,
    cancelBookings,
    getSingleUserBooking
}