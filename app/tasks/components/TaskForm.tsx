'use client'

import { TextArea, TextField, Select } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { Priority, Status, Task, Team } from '@prisma/client'
import { convertToUTC } from '@/app/utils/timeCoversion'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ErrorMessage } from '@/app/components/ErrorMessage'

const TaskForm = ({ task, teams }: { task?: ({ team: Team | null } & Task) | null; teams: Team[] }) => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, setValue } = useForm<Task>({
    defaultValues: {
      // need to set the default value for onChanegValue() to preserve previous data
      status: task ? task.status : Status.OPEN,
      priority: task ? task.priority : Priority.MEDIUM,
      teamId: task ? task.teamId : null
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      if (task) {
        await axios.patch(`/api/tasks/${task.id}`, data)
      } else {
        await axios.post('/api/tasks', data)
      }
      router.push('/tasks')
      router.refresh()
    } catch (error) {
      setSubmitting(false)
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setError(error.response.data.error)
      } else {
        setError('Unexpected error')
      }
    }
  })

  return (
    <div className='mt-6 space-y-4 px-40'>
      <form className='space-y-4' onSubmit={onSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className='space-y-2'>
          <h5>Title</h5>
          <TextField.Input className='text-center' size='3' defaultValue={task?.title} {...register('title')} />
        </div>

        <div className='space-y-2'>
          <h5>Description</h5>
          <TextArea className='h-52' size='3' defaultValue={task?.description} {...register('description')} />
        </div>

        <div className='flex gap-8'>
          <div className='space-y-2'>
            <h5>Deadline</h5>
            <div className=''>
              <TextField.Root className='w-32'>
                <TextField.Input
                  autoComplete='off'
                  size='3'
                  defaultValue={task?.deadline.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                  placeholder='MM/DD/YYYY'
                  {...register('deadline', {
                    setValueAs: (value) => convertToUTC(value, 23, 59)
                  })}
                />
              </TextField.Root>
            </div>
          </div>

          <div className='space-y-2'>
            <h5>Status</h5>
            <div>
              <Select.Root
                defaultValue={task ? task.status : Status.OPEN}
                size='3'
                onValueChange={(value) => {
                  setValue('status', Status[value as keyof typeof Status])
                }}
              >
                <Select.Trigger />
                <Select.Content position='popper'>
                  <Select.Item value={Status.OPEN}>Open</Select.Item>
                  <Select.Item value={Status.IN_PROGRESS}>In Progress</Select.Item>
                  <Select.Item value={Status.HELP_NEEDED}>Help Needed</Select.Item>
                  <Select.Item value={Status.CLOSED}>Closed</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>

          <div className='space-y-2'>
            <div>Priority</div>
            <div>
              <Select.Root
                defaultValue={task ? task.priority : Priority.MEDIUM}
                size='3'
                onValueChange={(value) => {
                  setValue('priority', Priority[value as keyof typeof Priority])
                }}
              >
                <Select.Trigger />
                <Select.Content position='popper'>
                  <Select.Item value={Priority.LOW}>Low</Select.Item>
                  <Select.Item value={Priority.MEDIUM}>Medium</Select.Item>
                  <Select.Item value={Priority.HIGH}>High</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>

          <div className='space-y-2'>
            <div>Team</div>
            <div>
              <Select.Root defaultValue={task?.team?.id ? String(task.team.id) : ' '} size='3' onValueChange={(value) => setValue('teamId', isNaN(parseInt(value)) ? null : parseInt(value))}>
                <Select.Trigger />
                <Select.Content position='popper'>
                  <Select.Item value={' '}></Select.Item>
                  {teams.map((team) => (
                    <Select.Item key={team.id} value={String(team.id)}>
                      {team.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </div>

        <div className='flex justify-center pt-6'>
          <button className=' w-28 h-10 cursor-default  rounded-md bg-[#134e4a] font-medium hover:bg-[#2a6a66] disabled:cursor-not-allowed disabled:opacity-50' disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export { TaskForm }
