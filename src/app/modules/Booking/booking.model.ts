import { Schema, model } from 'mongoose'
import { IBooking } from './booking.interface'
import { IsBooked_Status, P_Status } from './booking.constance'

const bookingSchema = new Schema<IBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    payableAmount: {
      type: Number,
      required: true,
    },
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'Facility',
      required: true,
    },
    isBooked: {
      type: String,
      required: true,
      enum: Object.keys(IsBooked_Status),
      default: IsBooked_Status.confirmed,
    },
    paymentStatus : {
      type : String,
      required : true,
      enum : Object.keys(P_Status),
      default :  P_Status.pending
    },
   transactionId : {
    type : String
   }
  },
  {
    versionKey: false,
  },
)

export const Booking = model<IBooking>("Booking", bookingSchema)
