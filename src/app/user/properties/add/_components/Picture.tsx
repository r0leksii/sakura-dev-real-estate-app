import React from 'react'

import FileInput from '@/app/components/fileUpload'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { Button, Card, cn } from '@nextui-org/react'

import PictureCard from './PictureCard'

interface Props {
  className?: string
  images: File[]
  next: () => void
  prev: () => void
  setImages: (images: File[]) => void
}

const Picture = (props: Props) => {
  const handleNext = () => {
    props.next()
  }

  return (
    <Card className={cn('p-3', props.className)}>
      <FileInput onSelect={e => props.setImages([(e as any).target.files[0], ...props.images])} />
      <div className={'flex gap-3 flex-wrap'}>
        {props.images.map((image, index) => {
          const srcUrl = URL.createObjectURL(image)

          return (
            <PictureCard
              index={index}
              key={srcUrl}
              onDelete={i =>
                props.setImages([...props.images.slice(0, i), ...props.images.slice(i + 1)])
              }
              src={srcUrl}
            />
          )
        })}
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

export default Picture
