import { prisma } from '@/lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) {
    throw new Error('Something went wrong with the authentication' + user)
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) {
    await prisma.user.create({
      data: {
        email: user.email ?? '',
        firstName: user.given_name ?? '',
        id: user.id,
        lastName: user.family_name ?? '',
      },
    })
  }

  return NextResponse.redirect('http://localhost:3000')
}
