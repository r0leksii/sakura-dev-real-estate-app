import React, { ReactNode } from 'react'

import PageTitle from '@/app/components/pageTitle'
import UploadAvatar from '@/app/user/_components/UploadAvatar'
import SectionTitle from '@/app/user/_components/sectionTitle'
import { getUserById } from '@/lib/action/user'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Avatar, Card } from '@nextui-org/react'

const ProfilePage = async () => {
  const { getUser } = await getKindeServerSession()

  const user = await getUser()
  const dbUser = await getUserById(user ? user.id : '')

  return (
    <div>
      <PageTitle href={'/'} linkCaption={'Back to Home Page'} title={'My Profile'} />
      <Card className={'m-4 flex flex-col gap-5 p-4'}>
        <SectionTitle title={'Basic Information'} />
        <div className={'flex'}>
          <div className={'flex flex-col items-center'}>
            <Avatar className={'h-20 w-20'} src={dbUser?.avatarUrl ?? '/blank-profile.png'} />
            <UploadAvatar userId={dbUser?.id!} />
          </div>
        </div>

        <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'}>
          <Attribute title={'Name'} value={`${dbUser?.firstName} ${dbUser?.lastName}`} />
          <Attribute title={'Email'} value={dbUser?.email} />
          <Attribute title={'Registration On'} value={dbUser?.createdAt.toLocaleDateString()} />
          <Attribute title={'Properties Posted'} value={1} />
        </div>
      </Card>
    </div>
  )
}

export default ProfilePage

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <div className={'flex flex-col text-sm'}>
      <span className={'font-semibold text-slate-800'}>{title}</span>
      <span className={'text-slate-600'}>{value}</span>
    </div>
  )
}
