import { Schema, model } from 'mongoose'
import { IFacility } from './facility.interface'

const facilitySchema = new Schema<IFacility>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false, // Disable the __v field
  },
)

export const Facility = model<IFacility>('Facility', facilitySchema)
