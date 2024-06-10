import React from 'react'
import { useFormContext } from 'react-hook-form'

import { AddPropertyInputType } from '@/app/user/properties/add/_components/AddPropertyForm'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { Button, Card, Input, Textarea, cn } from '@nextui-org/react'

interface Props {
  className?: string
  next: () => void
  prev: () => void
}

const Location = (props: Props) => {
  const {
    formState: { errors },
    register,
    trigger,
  } = useFormContext<AddPropertyInputType>()
  const handleNext = async () => {
    if (
      await trigger([
        'location.streetAddress',
        'location.zipCode',
        'location.city',
        'location.state',
        'location.region',
      ])
    ) {
      props.next()
    }
  }

  return (
    <Card className={cn('grid grid-cols-1 md:grid-cols-2 gap-3 p-4', props.className)}>
      <Input
        {...register('location.streetAddress')}
        errorMessage={errors.location?.streetAddress?.message}
        isInvalid={!!errors.location?.streetAddress}
        label={'Street Address'}
      />
      <Input
        {...register('location.zipCode')}
        errorMessage={errors.location?.zipCode?.message}
        isInvalid={!!errors.location?.zipCode}
        label={'Zip/Postal Code'}
      />
      <Input
        {...register('location.city')}
        errorMessage={errors.location?.city?.message}
        isInvalid={!!errors.location?.city}
        label={'City'}
      />
      <Input
        {...register('location.state')}
        errorMessage={errors.location?.state?.message}
        isInvalid={!!errors.location?.state}
        label={'State'}
      />
      <Input
        {...register('location.region')}
        className={'col-span-2'}
        errorMessage={errors.location?.region?.message}
        isInvalid={!!errors.location?.region}
        label={'Region/Neighborhood'}
      />
      <Textarea
        {...register('location.landmark')}
        className={'col-span-2'}
        errorMessage={errors.location?.landmark?.message}
        isInvalid={!!errors.location?.landmark}
        label={'Landmark'}
      />
      <div className={'flex justify-end col-span-2 gap-3'}>
        <Button
          className={'w-36'}
          color={'primary'}
          onClick={props.prev}
          startContent={<ChevronLeftIcon className={'w-6'} />}
        >
          Previous
        </Button>
        <Button
          className={'w-36'}
          color={'primary'}
          endContent={<ChevronRightIcon className={'w-6'} />}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Card>
  )
}

export default Location
