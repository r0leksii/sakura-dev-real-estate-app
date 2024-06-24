import React from 'react'

import { ImagesSlider } from '@/app/components/ImageSlider'
import PageTitle from '@/app/components/pageTitle'
import { prisma } from '@/lib/prisma'
import { Card } from '@nextui-org/react'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

const PropertyPage = async ({ params }: Props) => {
  const property = await prisma.property.findUnique({
    include: {
      contact: true,
      feature: true,
      images: true,
      location: true,
      status: true,
    },
    where: {
      id: +params.id,
    },
  })

  if (!property) {
    return notFound()
  }

  return (
    <div>
      <PageTitle href={'/'} linkCaption={'Back to Properties'} title={'Property Page'} />
      <div className={'p-4'}>
        <h2 className={'text-2xl font-bold text-primary my-5'}>{property.name}</h2>
        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-10'}>
          <div className={'col-span-2'}>
            <ImagesSlider images={property.images.map(img => img.url)} overlay={false} />
            <h2 className={'text-2xl font-bold text-gray-700 mt-7'}>
              ${property.price} / {property.status.value}
            </h2>
            <p className={'text-sm text-slate-600 mt-7'}>{property.description}</p>
          </div>
          <Card className={'p-5 flex flex-col gap-1'}>
            <Title title={'Features'} />
            <Attribute label={'Bedrooms'} value={property.feature?.bedrooms} />
            <Attribute label={'Bathrooms'} value={property.feature?.bathrooms} />
            <Attribute label={'Parking Spots'} value={property.feature?.parkingSpots} />
            <Attribute label={'Area'} value={property.feature?.area} />

            <Title className={'mt-7'} title={'Address'} />
            <Attribute label={'City'} value={property.location?.city} />
            <Attribute label={'Landmark'} value={property.location?.landmark} />
            <Attribute label={'Zip Code'} value={property.location?.zipCode} />
            <Attribute label={'Address'} value={property.location?.streetAddress} />

            <Title className={'mt-7'} title={'Owner Details'} />
            <Attribute label={'Owner Name'} value={property.contact?.name} />
            <Attribute label={'Email'} value={property.contact?.email} />
            <Attribute label={'Phone'} value={property.contact?.phone} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PropertyPage

const Title = ({ className, title }: { className?: string; title: string }) => (
  <div className={className}>
    <h2 className={'text-xl font-bold text-slate-700'}>{title}</h2>
    <hr className={'border border-solid border-slate-300'} />
  </div>
)

const Attribute = ({ label, value }: { label: string; value?: number | string }) => (
  <div className={'flex justify-between'}>
    <span className={'text-sm text-slate-600'}>{label}</span>
    <span className={'text-sm text-slate-600'}>{value}</span>
  </div>
)
