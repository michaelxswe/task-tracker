'use client'

import { AlertDialog } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteButton = ({ id }: { id: string }) => {
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
          <button className="h-10 cursor-default  rounded-md bg-red-600 font-medium hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50">Delete</button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title className="flex justify-center">Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description className="flex justify-center">Are you sure you want to delete this task?</AlertDialog.Description>
          <div className="mt-4 flex justify-evenly">
            <AlertDialog.Action>
              <button className=" h-10 w-24 cursor-default  rounded-md bg-rose-950 font-medium hover:bg-rose-900" onClick={onDelete}>
                Delete
              </button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <button className=" h-10 w-24 cursor-default rounded-md bg-gray-800 font-medium hover:bg-gray-700">Cancle</button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title className="flex justify-center">Error</AlertDialog.Title>
          <AlertDialog.Description className="flex justify-center">This task cannot be deleted</AlertDialog.Description>
          <div className="flex justify-center">
            <button className="mt-4 h-10 w-24 cursor-default rounded-md bg-gray-800 font-medium hover:bg-gray-700" onClick={() => setError(false)}>
              OK
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export { DeleteButton }
