'use client'

import axios from 'axios'
import { AlertDialog } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteTask = ({ id }: { id: string }) => {
  const router = useRouter()

  const [error, setError] = useState(false)

  const [deleting, setDeleting] = useState(false)

  const onDelete = async () => {
    try {
      setDeleting(true)
      await axios.delete(`/api/tasks/${id}`)
      router.push('/tasks')
      router.refresh()
    } catch (error) {
      setDeleting(false)
      setError(true)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger disabled={deleting}>
          <button className='h-10 w-full rounded-md bg-[#500724] font-medium hover:bg-[#70193B] disabled:cursor-not-allowed disabled:opacity-50'>
            Delete
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content className='space-y-5'>
          <AlertDialog.Title className='flex justify-center'>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description className='flex justify-center'>
            Are you sure you want to delete this task?
          </AlertDialog.Description>
          <div className='flex justify-evenly'>
            <AlertDialog.Action>
              <button
                className='h-10 w-24 rounded-md bg-rose-950 font-medium hover:bg-rose-900'
                onClick={onDelete}
              >
                Delete
              </button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <button className='h-10 w-24 rounded-md bg-gray-800 font-medium hover:bg-gray-700'>
                Cancle
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content className='space-y-5'>
          <AlertDialog.Title className='flex justify-center'>Error</AlertDialog.Title>
          <AlertDialog.Description className='flex justify-center'>
            This task cannot be deleted
          </AlertDialog.Description>
          <div className='flex justify-center'>
            <button
              className='h-10 w-24 rounded-md bg-gray-800 font-medium hover:bg-gray-700'
              onClick={() => setError(false)}
            >
              OK
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export { DeleteTask }
