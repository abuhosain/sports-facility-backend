import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { IFacility } from './facility.interface'
import { Facility } from './facility.model'

const createFacilitiesIntoDb = async (payload: IFacility) => {
  const result = await Facility.create(payload)
  return result
}

const updateFacilitiesFromDb = async (
  id: string,
  payload: Partial<IFacility>,
) => {
  const facility = await Facility.findById(id)
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility is not found')
  }
  const result = await Facility.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteFacilitiesFromDb = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result;
}

const getAllFacilitiesFromDb = async() => {
  const result = await Facility.find({});
  return result;
}

export const FacilityServices = {
  createFacilitiesIntoDb,
  updateFacilitiesFromDb,
  deleteFacilitiesFromDb,
  getAllFacilitiesFromDb
}
