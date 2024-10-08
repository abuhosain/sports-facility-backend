/* eslint-disable prefer-const */
import { JwtPayload } from 'jsonwebtoken'
import { Booking } from './booking.model'
import { IBooking } from './booking.interface'
import { User } from '../Auth/auth.model'
import { Facility } from '../Facility/facility.model'
import { calculateAmount } from './utils'
import { IsBooked_Status } from './booking.constance'
import { initiatePayment } from '../payment/payment.utils'

const createdBookingIntoDB = async (user: JwtPayload, payload: IBooking) => {
  let booking: IBooking = { ...payload }

  const isUserExists = await User.findOne({ email: user?.email })
  const isFindFacility = await Facility.findById(payload?.facility)

  if (isUserExists && isFindFacility) {
    // Check for facility availability

     await Booking.find({
      facility: payload.facility,
      // Assuming booking times are stored in startTime and endTime fields
      startTime: { $lt: payload.endTime },
      endTime: { $gt: payload.startTime },
    })

    // if (existingBookings.length > 0) {
    //   throw new Error(
    //     'Sorry! The facility is unavailable during the requested time slot.',
    //   )
    // }
    
    if (isUserExists) {
      // User Id set
      booking.user = isUserExists._id
    } else {
      throw new Error('Sorry! User  is missing!')
    }

    // PAYABLE AMOUNT HANDLER
    const pricePerHour = Number(isFindFacility?.pricePerHour)
    const payableAmount = calculateAmount(pricePerHour, payload)
    if (payableAmount) {
      booking.payableAmount = payableAmount
    } else {
      throw new Error('calculate Payable Amount Failed')
    }

    // transiction
    const transactionId = `TXN-${Date.now()}`
    booking.transactionId = transactionId
  } else {
    throw new Error('Sorry! User or facility not found!')
  }

    await Booking.create(booking)
  const paymentData = {
    transactionId: booking.transactionId,
    totalPrice: booking.payableAmount,
    custormerName: isUserExists.name,
    customerEmail: isUserExists.email,
    customerPhone: isUserExists.phone,
    customerAddress: isUserExists.address,
  }

  const paymentSeasion = await initiatePayment(paymentData)
  return paymentSeasion
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
  ).populate('facility')

  return result
}

const getSingleUserBookingsFromDB = async (id: string) => {
  const result = await Booking.findById(id).populate('facility')
  return result
}

export const BookingServices = {
  createdBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  cancellBookingFromDb,
  getSingleUserBookingsFromDB,
}
