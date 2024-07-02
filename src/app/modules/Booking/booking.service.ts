/* eslint-disable prefer-const */
import { JwtPayload } from 'jsonwebtoken'
import { Booking } from './booking.model'
import { IBooking } from './booking.interface'
import { User } from '../Auth/auth.model'
import { Facility } from '../Facility/facility.model'
import { calculateAmount } from './utils'
import { IsBooked_Status } from './booking.constance'

const createdBookingIntoDB = async (user: JwtPayload, payload: IBooking) => {
  let booking: IBooking = { ...payload }

  const isUserExists = await User.findOne({ email: user?.email })
  const isFindFacility = await Facility.findById(payload?.facility)

  if (isUserExists && isFindFacility) {
    // Check for facility availability
    const existingBookings = await Booking.find({
      facility: payload.facility,
      // Assuming booking times are stored in startTime and endTime fields
      startTime: { $lt: payload.endTime },
      endTime: { $gt: payload.startTime },
    })

    if (existingBookings.length > 0) {
      throw new Error(
        'Sorry! The facility is unavailable during the requested time slot.',
      )
    }

    // User Id set
    booking.user = isUserExists._id
    // PAYABLE AMOUNT HANDLER
    const pricePerHour = Number(isFindFacility?.pricePerHour)
    booking.payableAmount = calculateAmount(pricePerHour, payload)
  } else {
    throw new Error('Sorry! User or facility not found!')
  }

  const result = await Booking.create(booking)
  return result
}

const getAllBookingsFromDB = async () => {
  const result = await Booking.find({
    isBooked: { $eq: IsBooked_Status.confirmed },
  })
    .populate('user')
    .populate('facility')
  return result
}

// RETRIVE  BOOKINGS FOR SPECIFIC USER FROM DATABASE

const getUserBookingsFromDB = async (user: JwtPayload) => {
  const isUserExists = await User.findOne({ email: user?.email })
  const result = await Booking.find({
    user: isUserExists?._id,
    isBooked: { $eq: IsBooked_Status.confirmed },
  })
    .populate('user')
    .populate('facility')

  return result
}


//  cencell bookings from db
const cancellBookingFromDb = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: IsBooked_Status.canceled },
    { new: true },
  ).populate('facility');

  return result;
};
export const BookingServices = {
  createdBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  cancellBookingFromDb
}
