import { z } from 'zod';

// Define a Zod schema for ObjectId
const objectIdSchema = z
  .string()
  .refine((val) => val.length === 24 && /^[0-9a-fA-F]*$/.test(val), {
    message: 'Invalid ObjectId',
  });

 const createBokingSchemaValidation = z.object({
  body: z.object({
    date: z.string({ invalid_type_error: 'Date is required' }),
    startTime: z.string({ invalid_type_error: 'start time is required' }),
    endTime: z.string({ invalid_type_error: ' end time  is required' }),
    facility: objectIdSchema,
  }),
});

export const BookingValidation = {
    createBokingSchemaValidation
}
