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

export const BookingControllers = {
    createBookings
}