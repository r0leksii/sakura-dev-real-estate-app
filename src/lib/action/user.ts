'use server'

import { prisma } from '../prisma'

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export async function updateUserAvatar(avatarUrl: string, userId: string) {
  return await prisma.user.update({
    data: {
      avatarUrl,
    },
    where: {
      id: userId,
    },
  })
}
