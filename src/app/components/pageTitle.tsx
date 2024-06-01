import React from 'react'

import Link from 'next/link'

interface Props {
  href?: string
  linkCaption?: string
  title?: string
}

const PageTitle = (props: Props) => {
  return (
    <div className={'bg-gradient-to-br from-cyan-400 to-blue-600 p-4'}>
      <h1 className={'text-xl font-medium text-white'}>{props.title}</h1>
      {props.href!! && (
        <Link className={'text-white transition-colors hover:text-cyan-200'} href={props.href}>
          {props.linkCaption}
        </Link>
      )}
    </div>
  )
}

export default PageTitle
