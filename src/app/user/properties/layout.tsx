import React, { ReactNode } from 'react'

import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/react'

interface Props {
  children: ReactNode
}

const PropertiesLayout = ({ children }: Props) => {
  return (
    <div>
      <div className={'bg-primary-400 flex justify-between items-center p-2'}>
        <h2 className={'text-white text-xl font-semibold px-2'}>User Properties</h2>
        <Button as={Link} color={'secondary'} href={'/user/properties/add'}>
          Add Property
        </Button>
      </div>
      {children}
    </div>
  )
}

export default PropertiesLayout
