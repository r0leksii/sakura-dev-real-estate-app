'use client'

import React from 'react'

import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import {
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { EyeIcon } from '@nextui-org/shared-icons'
import { Prisma } from '@prisma/client'
import { useRouter } from 'next/navigation'

type Props = {
  currentPage: number
  properties: Prisma.PropertyGetPayload<{
    include: {
      status: true
      type: true
    }
  }>[]
  totalPages: number
}

const PropertiesTable = ({ currentPage, properties, totalPages }: Props) => {
  const router = useRouter()

  return (
    <div className={'flex flex-col items-center gap-4'}>
      <Table>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {properties.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.type.value}</TableCell>
              <TableCell>{item.status.value}</TableCell>
              <TableCell>
                <div className={'flex items-center gap-4'}>
                  <Tooltip content={'View Property'}>
                    <Link href={`/property/${item.id}`}>
                      <EyeIcon className={'w-5 text-slate-500'} />
                    </Link>
                  </Tooltip>
                  <Tooltip color={'warning'} content={'Edit Property'}>
                    <Link href={`/user/properties/${item.id}/edit`}>
                      <PencilIcon className={'w-5 text-yellow-500'} />
                    </Link>
                  </Tooltip>
                  <Tooltip color={'danger'} content={'Delete Property'}>
                    <Link href={`/user/properties/${item.id}/delete`}>
                      <TrashIcon className={'w-5 text-red-500'} />
                    </Link>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        initialPage={1}
        onChange={page => router.push(`/user/properties?pagenum=${page}`)}
        page={currentPage}
        total={totalPages}
      />
    </div>
  )
}

export default PropertiesTable
