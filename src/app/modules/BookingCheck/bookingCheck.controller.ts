import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { BookingCheakerServices } from './bookingCheck.service'

const bookingChecker = catchAsync(async (req, res) => {
  const query = req.query
  const result = await BookingCheakerServices.bookingCheakerFromDb(query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  })
})

export const BookingCheckerController = {
  bookingChecker,
}
