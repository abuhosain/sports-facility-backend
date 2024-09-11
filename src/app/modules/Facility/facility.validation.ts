import { z } from 'zod'

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    pricePerHour: z.number().min(0, 'Price per hour must be a positive number'),
    location: z.string().min(1, 'Location is required'),
    image: z.string().min(1, 'Image is required'),
  }),
})

const updateFacilityValidationSchema = z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required').optional(),
      description: z.string().min(1, 'Description is required').optional(),
      pricePerHour: z.number().min(0, 'Price per hour must be a positive number').optional(),
      location: z.string().min(1, 'Location is required').optional(),
    })
  });
  

export const FaciltyValidation = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema
}
