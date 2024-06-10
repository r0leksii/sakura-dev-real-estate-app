import React from 'react'

import AddPropertyForm from '@/app/user/properties/add/_components/AddPropertyForm'
import { prisma } from '@/lib/prisma'

const AddPropertyPage = async () => {
  const [propertyTypes, propertyStatuses] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
  ])

  return <AddPropertyForm statuses={propertyStatuses} types={propertyTypes} />
}

export default AddPropertyPage
