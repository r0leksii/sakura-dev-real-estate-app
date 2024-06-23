import React from 'react'

import PropertiesTable from '@/app/user/properties/_components/PropertiesTable'
import { prisma } from '@/lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const PAGE_SIZE = 12

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

const PropertiesPage = async ({ searchParams }: Props) => {
  const { getUser } = await getKindeServerSession()

  const user = await getUser()

  const pagenum = searchParams.pagenum ?? 0

  const propertiesPromise = prisma.property.findMany({
    include: {
      status: true,
      type: true,
    },
    skip: +pagenum * PAGE_SIZE,
    take: PAGE_SIZE,
    where: {
      userId: user?.id,
    },
  })

  const totalPropertiesPromise = prisma.property.count({
    where: {
      userId: user?.id,
    },
  })

  const [properties, totalProperties] = await Promise.all([
    propertiesPromise,
    totalPropertiesPromise,
  ])

  const totalPages = Math.ceil(totalProperties / PAGE_SIZE)

  return <PropertiesTable currentPage={+pagenum} properties={properties} totalPages={totalPages} />
}

export default PropertiesPage
