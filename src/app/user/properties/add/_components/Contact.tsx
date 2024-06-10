import React from 'react'
import { useFormContext } from 'react-hook-form'

import { AddPropertyInputType } from '@/app/user/properties/add/_components/AddPropertyForm'
import { ChevronLeftIcon, PlusCircleIcon } from '@heroicons/react/16/solid'
import { Button, Card, Input, cn } from '@nextui-org/react'

interface Props {
  className?: string
  prev: () => void
}

const Contact = ({ className, prev }: Props) => {
  const {
    formState: { errors },
    register,
  } = useFormContext<AddPropertyInputType>()

  return (
    <Card className={cn('grid grid-cols-1 md:grid-cols-3 gap-3 p-2', className)}>
      <Input
        {...register('contact.name')}
        errorMessage={errors.contact?.name?.message}
        isInvalid={!!errors.contact?.name}
        label={'Contact Name'}
      />
      <Input
        {...register('contact.phone')}
        errorMessage={errors.contact?.phone?.message}
        isInvalid={!!errors.contact?.phone}
        label={'Phone'}
      />
      <Input
        {...register('contact.email')}
        errorMessage={errors.contact?.email?.message}
        isInvalid={!!errors.contact?.email}
        label={'Email'}
      />
      <div className={'flex justify-end col-span-3 gap-3'}>
        <Button
          className={'w-36'}
          color={'primary'}
          onClick={prev}
          startContent={<ChevronLeftIcon className={'w-6'} />}
        >
          Previous
        </Button>
        <Button
          className={'w-36'}
          color={'secondary'}
          endContent={<PlusCircleIcon className={'w-6'} />}
          type={'submit'}
        >
          Save
        </Button>
      </div>
    </Card>
  )
}

export default Contact
