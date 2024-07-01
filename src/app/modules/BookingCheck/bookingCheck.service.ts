import { IsBooked_Status } from '../Booking/booking.constance'
import { Booking } from '../Booking/booking.model'
import { getAvailableTimeSlots } from './bookingCheaker.utils'

const bookingCheakerFromDb = async (query: Record<string, unknown>) => {
  // todays date
  const date = new Date().toISOString()
  const currentDate = date.substring(0, date.indexOf('T'))
  const requestedDate = query.date || currentDate

  const result = await Booking.find(
    { date: requestedDate, isBooked: { $ne: IsBooked_Status.canceled } },
    { endTime: 1, startTime: 1, _id: 0 },
  )

  const availableSlots = getAvailableTimeSlots(result)

  return availableSlots
}

export const BookingCheakerServices = {
    bookingCheakerFromDb,
}
