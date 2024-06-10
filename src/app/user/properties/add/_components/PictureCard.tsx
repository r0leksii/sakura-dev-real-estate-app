import React from 'react'

import { TrashIcon } from '@heroicons/react/16/solid'
import { Card, Image } from '@nextui-org/react'

interface Props {
  index: number
  onDelete: (index: number) => void
  src: string
}

const PictureCard = ({ index, onDelete, src }: Props) => {
  return (
    <Card className={'flex flex-col items-center'}>
      <Image className={'w-36 h-36 object-contain'} src={src} />
      <button className={'mb-2'} onClick={() => onDelete(index)}>
        <TrashIcon className={'text-danger-400 w-4'} />
      </button>
    </Card>
  )
}

export default PictureCard
