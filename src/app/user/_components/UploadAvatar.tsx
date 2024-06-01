'use client'

import { useState } from 'react'

import FileInput from '@/app/components/fileUpload'
import { updateUserAvatar } from '@/lib/action/user'
import { uploadAvatar } from '@/lib/upload'
import { PencilIcon } from '@heroicons/react/16/solid'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Button, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const UploadAvatar = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  return (
    <div>
      <button onClick={onOpen}>
        <PencilIcon className={'w-6 text-slate-400 transition-colors hover:text-primary'} />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className={'flex flex-col gap-1'}>Upload Avatar</ModalHeader>
              <ModalBody>
                <FileInput onChange={e => setImage((e as any).target.files[0])} />
                {image && <Image alt={'avatar'} height={50} src={URL.createObjectURL(image)} />}
              </ModalBody>
              <ModalFooter>
                <Button color={'danger'} onPress={onClose} variant={'light'}>
                  Cancel
                </Button>
                <Button
                  color={'primary'}
                  isLoading={isSubmitting}
                  onPress={async () => {
                    setIsSubmitting(true)
                    if (!image) {
                      onClose()

                      return
                    }
                    const avatarUrl = await uploadAvatar(image)
                    const result = await updateUserAvatar(avatarUrl, userId)

                    router.refresh()
                    setIsSubmitting(false)
                    onClose()
                  }}
                >
                  Change Avatar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UploadAvatar
