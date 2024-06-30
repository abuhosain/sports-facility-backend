import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { FacilityServices } from './facility.service'

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilitiesIntoDb(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  })
})

const updateFacilities = catchAsync(async (req, res) => {
  const {id}  = req.params;
  const updatedFacilities = req.body;
  const result = await FacilityServices.updateFacilitiesFromDb(id , updatedFacilities);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  })
})

const deleteFacility = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await FacilityServices.deleteFacilitiesFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility deleted successfully',
    data: result,
  })
})

export const FacilityControllers = {
    createFacility,
    updateFacilities,
    deleteFacility
}