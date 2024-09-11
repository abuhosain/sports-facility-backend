import { Types } from 'mongoose'
import { IsBooked_Status, P_Status } from './booking.constance'

export interface IBooking {
  date: string
  startTime: string
  endTime: string
  user?: Types.ObjectId
  payableAmount?: number
  facility?: Types.ObjectId
  isBooked?: keyof typeof IsBooked_Status;
  transactionId?: string;
  paymentStatus?: keyof typeof P_Status;
}
