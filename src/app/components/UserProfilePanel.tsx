'use client'
import React from 'react'

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  User,
} from '@nextui-org/react'
import { User as PrismaUser } from '@prisma/client'

interface Props {
  user: PrismaUser
}

const UserProfilePanel = ({ user }: Props) => {
  return (
    <Dropdown placement={'bottom-start'}>
      <DropdownTrigger>
        <User
          as={'button'}
          avatarProps={{
            isBordered: true,
            src: user.avatarUrl ?? '/blank-profile.png',
          }}
          className={'transition-transform'}
          name={`${user.firstName} ${user.lastName}`}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label={'User Actions'} variant={'flat'}>
        <DropdownItem key={'profile'}>
          <Link href={'/user/profile'}>Profile</Link>
        </DropdownItem>
        <DropdownItem color={'danger'} key={'logout'}>
          <LogoutLink>Log Out</LogoutLink>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserProfilePanel
