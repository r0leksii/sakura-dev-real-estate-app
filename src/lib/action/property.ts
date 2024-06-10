'use server'

import { AddPropertyInputType } from '@/app/user/properties/add/_components/AddPropertyForm'
import { prisma } from '@/lib/prisma'
import { Property } from '@prisma/client'

export async function saveProperty(
  propertyData: AddPropertyInputType,
  imagesUrls: string[],
  userId: string
) {
  const basic: Omit<Property, 'id'> = {
    description: propertyData.description,
    name: propertyData.name,
    price: propertyData.price,
    statusId: propertyData.statusId,
    typeId: propertyData.typeId,
    userId,
  }
  const result = await prisma.property.create({
    data: {
      ...basic,
      contact: {
        create: propertyData.contact,
      },
      feature: {
        create: propertyData.propertyFeatures,
      },
      images: {
        create: imagesUrls.map(img => ({ url: img })),
      },
      location: {
        create: propertyData.location,
      },
    },
  })

  return result
}
