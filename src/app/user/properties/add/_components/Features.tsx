import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { AddPropertyInputType } from '@/app/user/properties/add/_components/AddPropertyForm'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { Button, Card, Checkbox, Input, cn } from '@nextui-org/react'

interface Props {
  className?: string
  next: () => void
  prev: () => void
}

const Features = (props: Props) => {
  const {
    control,
    formState: { errors },
    register,
    trigger,
  } = useFormContext<AddPropertyInputType>()
  const handleNext = async () => {
    if (
      await trigger([
        'propertyFeatures.bedrooms',
        'propertyFeatures.bathrooms',
        'propertyFeatures.parkingSpots',
        'propertyFeatures.area',
      ])
    ) {
      props.next()
    }
  }

  return (
    <Card className={cn('grid grid-cols-1 md:grid-cols-2 gap-3 p-4', props.className)}>
      <Input
        {...register('propertyFeatures.bedrooms')}
        errorMessage={errors.propertyFeatures?.bedrooms?.message}
        isInvalid={!!errors.propertyFeatures?.bedrooms}
        label={'Bedrooms'}
      />
      <Input
        {...register('propertyFeatures.bathrooms')}
        errorMessage={errors.propertyFeatures?.bathrooms?.message}
        isInvalid={!!errors.propertyFeatures?.bathrooms}
        label={'Bathrooms'}
      />
      <Input
        {...register('propertyFeatures.parkingSpots')}
        errorMessage={errors.propertyFeatures?.parkingSpots?.message}
        isInvalid={!!errors.propertyFeatures?.parkingSpots}
        label={'Parking Spots'}
      />
      <Input
        {...register('propertyFeatures.area')}
        errorMessage={errors.propertyFeatures?.area?.message}
        isInvalid={!!errors.propertyFeatures?.area}
        label={'Area'}
      />
      <div className={'flex items-center justify-between'}>
        <Controller
          control={control}
          name={'propertyFeatures.hasSwimmingPool'}
          render={({ field }) => (
            <Checkbox onBlur={field.onBlur} onChange={field.onChange}>
              Has Swimming Pool
            </Checkbox>
          )}
        />
        <Controller
          control={control}
          name={'propertyFeatures.hasGardenYard'}
          render={({ field }) => (
            <Checkbox onBlur={field.onBlur} onChange={field.onChange}>
              Has Garden Yard
            </Checkbox>
          )}
        />
        <Controller
          control={control}
          name={'propertyFeatures.hasBalcony'}
          render={({ field }) => (
            <Checkbox onBlur={field.onBlur} onChange={field.onChange}>
              Has Balcony/Patio
            </Checkbox>
          )}
        />
      </div>
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

export default Features
