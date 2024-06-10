import validator from 'validator'
import { z } from 'zod'

export const AddPropertyFormSchema = z.object({
  contact: z.object({
    email: z.string().email(),
    name: z.string().min(1, 'Please enter a name'),
    phone: z.string().refine(validator.isMobilePhone, 'Please enter a valid phone number'),
  }),
  description: z.string().min(3),
  location: z.object({
    city: z.string().min(1, 'Please enter a city'),
    landmark: z.string(),
    region: z.string().min(1, 'Please enter a region'),
    state: z.string().min(1, 'Please enter a state'),
    streetAddress: z.string().min(1, 'Please enter a street address'),
    zipCode: z
      .string()
      .refine(data => validator.isPostalCode(data, 'US'), 'Please enter a valid zip code'),
  }),
  name: z.string().min(1, 'Please enter a name for the property'),
  price: z
    .string()
    .min(1, 'Please enter a price for the property')
    .regex(new RegExp(/^\d+(\.\d{1,2})?$/), 'Please enter a number')
    .transform((data: unknown) => Number(data)),
  propertyFeatures: z.object({
    area: z
      .string()
      .regex(new RegExp('^[0-9]+$'), 'Please enter the area')
      .transform((data: unknown) => Number(data)),
    bathrooms: z
      .string()
      .regex(new RegExp('^[0-9]+$'), 'Please enter number of bathrooms')
      .transform((data: unknown) => Number(data)),
    bedrooms: z
      .string()
      .regex(new RegExp('^[0-9]+$'), 'Please enter number of bedrooms')
      .transform((data: unknown) => Number(data)),
    hasBalcony: z.boolean(),
    hasGardenYard: z.boolean(),
    hasSwimmingPool: z.boolean(),
    parkingSpots: z
      .string()
      .regex(new RegExp('^[0-9]+$'), 'Please enter number of parking spots')
      .transform((data: unknown) => Number(data)),
  }),
  statusId: z
    .string()
    .min(1, 'Select the status of your property')
    .transform((data: unknown) => Number(data)),
  typeId: z
    .string()
    .min(1, 'Select the type of your property')
    .transform((data: unknown) => Number(data)),
})
