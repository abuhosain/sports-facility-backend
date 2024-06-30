import { z } from 'zod'

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Passowrd is required' }),
  }),
})

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    phone: z.string(),
    role: z.enum(['admin', 'user'], {
      message: "Role must be either 'admin' or 'user'",
    }),
    address: z.string().min(1, { message: 'Address is required' })
  }),
})

export const AuthVallidation = {
  loginValidationSchema,
  createUserValidationSchema,
}
