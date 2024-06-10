'use client'

import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import Contact from '@/app/user/properties/add/_components/Contact'
import Picture from '@/app/user/properties/add/_components/Picture'
import { saveProperty } from '@/lib/action/property'
import { uploadImages } from '@/lib/upload'
import { AddPropertyFormSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { cn } from '@nextui-org/system-rsc'
import { Prisma, PropertyStatus, PropertyType } from '@prisma/client'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import Basic from './Basic'
import Features from './Features'
import Location from './Location'
import Stepper from './Stepper'

const steps = [
  { label: 'Basic' },
  { label: 'Location' },
  { label: 'Features' },
  { label: 'Pictures' },
  { label: 'Contact' },
]

interface Props {
  property?: Prisma.PropertyGetPayload<{
    include: {
      contact: true
      location: true
    }
  }>
  statuses: PropertyStatus[]
  types: PropertyType[]
}

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>

const AddPropertyForm = (props: Props) => {
  const methods = useForm<AddPropertyInputType>({
    defaultValues: {
      contact: props.property?.contact ?? undefined,
      location: props.property?.location ?? undefined,
    },
    resolver: zodResolver(AddPropertyFormSchema),
  })
  const [step, setStep] = useState(0)
  const [images, setImages] = useState<File[]>([])

  const { user } = useKindeBrowserClient()

  const onSubmit: SubmitHandler<AddPropertyInputType> = async data => {
    const imageUrls = await uploadImages(images)

    try {
      await saveProperty(data, imageUrls, user?.id!)
      redirect('/user/properties')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <Stepper activeItem={step} className={'pt-6 px-6'} items={steps} setActiveItem={setStep} />
      <FormProvider {...methods}>
        <form className={'mt-3 p-2'} onSubmit={methods.handleSubmit(onSubmit)}>
          <Basic
            className={cn({ hidden: step !== 0 })}
            next={() => setStep(prev => prev + 1)}
            statuses={props.statuses}
            types={props.types}
          />
          <Location
            className={cn({ hidden: step !== 1 })}
            next={() => setStep(prev => prev + 1)}
            prev={() => setStep(prev => prev - 1)}
          />
          <Features
            className={cn({ hidden: step !== 2 })}
            next={() => setStep(prev => prev + 1)}
            prev={() => setStep(prev => prev - 1)}
          />
          <Picture
            className={cn({ hidden: step !== 3 })}
            images={images}
            next={() => setStep(prev => prev + 1)}
            prev={() => setStep(prev => prev - 1)}
            setImages={setImages}
          />
          <Contact className={cn({ hidden: step !== 4 })} prev={() => setStep(prev => prev - 1)} />
        </form>
      </FormProvider>
    </div>
  )
}

export default AddPropertyForm
