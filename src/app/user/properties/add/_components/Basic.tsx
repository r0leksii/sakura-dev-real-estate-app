import React from 'react'
import { useFormContext } from 'react-hook-form'

import { AddPropertyInputType } from '@/app/user/properties/add/_components/AddPropertyForm'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { Button, Card, Input, Select, SelectItem, Textarea, cn } from '@nextui-org/react'
import { PropertyStatus, PropertyType } from '@prisma/client'

interface Props {
  className?: string
  next: () => void
  statuses: PropertyStatus[]
  types: PropertyType[]
}

const Basic = (props: Props) => {
  const {
    formState: { errors },
    register,
    trigger,
  } = useFormContext<AddPropertyInputType>()

  const handleNext = async () => {
    if (await trigger(['name', 'description', 'typeId', 'statusId', 'price'])) {
      props.next()
    }
  }

  return (
    <Card className={cn('grid grid-cols-3 gap-3 p-4', props.className)}>
      <Input
        {...register('name')}
        className={'md:col-span-3'}
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        label={'Name'}
      />
      <Textarea
        {...register('description')}
        className={'md:col-span-3'}
        errorMessage={errors.description?.message}
        isInvalid={!!errors.description}
        label={'Description'}
      />
      <Select
        {...register('typeId')}
        errorMessage={errors.typeId?.message}
        isInvalid={!!errors.typeId}
        label={'Type'}
        selectionMode={'single'}
      >
        {props.types.map(item => (
          <SelectItem key={item.id} value={item.id}>
            {item.value}
          </SelectItem>
        ))}
      </Select>
      <Select
        {...register('statusId')}
        errorMessage={errors.statusId?.message}
        isInvalid={!!errors.statusId}
        label={'Status'}
        selectionMode={'single'}
      >
        {props.statuses.map(item => (
          <SelectItem key={item.id} value={item.id}>
            {item.value}
          </SelectItem>
        ))}
      </Select>
      <Input
        {...register('price')}
        errorMessage={errors.price?.message}
        isInvalid={!!errors.price}
        label={'Price'}
      />
      <div className={'flex justify-end col-span-3 gap-3'}>
        <Button
          className={'w-36'}
          color={'primary'}
          isDisabled
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

export default Basic
