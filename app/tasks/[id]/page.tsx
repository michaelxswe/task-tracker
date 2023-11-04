import ReactMarkDown from 'react-markdown'
import prisma from '@/prisma/client'
import { TaskPriorityBadge, TaskStatusBadge } from '@/app/tasks/components/TaskBadge'
import { Card } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { DeleteTask } from './components/DeleteTask'
import { Metadata } from 'next'
import { Status } from '@prisma/client'
import { EditTask } from './components/EditTask'

const TaskDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
    include: { team: true }
  })

  if (!task) {
    notFound()
  }

  return (
    <div className='grid grid-cols-12 gap-20'>
      <div className='col-span-8 space-y-5'>
        <h1 className='text-3xl font-bold'>{task.title}</h1>

        <div className='flex items-center justify-between'>
          <div className=' space-x-5'>
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>
          <p
            className={`${
              task.deadline.getTime() <= new Date().getTime() &&
              task.status !== Status.CLOSED &&
              'text-red-700'
            }`}
          >
            {task.deadline.toDateString()}
          </p>
        </div>

        <Card className='prose max-w-full text-white'>
          <ReactMarkDown>{task.description}</ReactMarkDown>
        </Card>
      </div>

      <div className='col-span-4'>
        <div className='space-y-5'>
          <EditTask id={id} />
          <DeleteTask id={id} />
        </div>
      </div>
    </div>
  )
}

export default TaskDetailPage
export const metadata: Metadata = {
  title: 'Task Detail',
  description: 'View Task Detail'
}
