import prisma from '@/prisma/client'
import { TasksTable } from './components/TasksTable'
import { TeamForm } from './components/TeamForm'
import { TaskFilter } from './components/TaskFilter'
import { Priority, Status } from '@prisma/client'
import { Pagination } from '../components/global/Pagination'
import { Metadata } from 'next'
import { CreateTask } from './components/CreateTask'

interface Props {
  searchParams: {
    teamId?: string
    status?: Status
    priority?: Priority
    createdSortInAsc?: string
    DeadlineSortInDesc?: string
    sortDeadlineFirst?: string
    late?: string
    title?: string
    page?: string
  }
}

const TasksPage = async ({ searchParams }: Props) => {
  const currPage = parseInt(searchParams.page || '1')
  const pageSize = 5

  const tasks = await prisma.task.findMany({
    include: {
      team: true
    },

    orderBy: [
      ...(searchParams.sortDeadlineFirst
        ? [
            { deadline: (searchParams.DeadlineSortInDesc ? 'desc' : 'asc') as 'desc' | 'asc' },
            { createdAt: (searchParams.createdSortInAsc ? 'asc' : 'desc') as 'desc' | 'asc' }
          ]
        : [
            { createdAt: (searchParams.createdSortInAsc ? 'asc' : 'desc') as 'desc' | 'asc' },
            { deadline: (searchParams.DeadlineSortInDesc ? 'desc' : 'asc') as 'desc' | 'asc' }
          ])
    ],

    where: {
      ...(searchParams.teamId && { teamId: parseInt(searchParams.teamId) }),
      ...(searchParams.status && { status: searchParams.status }),
      ...(searchParams.priority && { priority: searchParams.priority }),
      ...(searchParams.title && { title: { startsWith: searchParams.title, mode: 'insensitive' } }),
      ...(searchParams.late && {
        deadline: { lte: new Date() },
        status: searchParams.status
          ? { not: Status.CLOSED, equals: searchParams.status }
          : { not: Status.CLOSED }
      })
    },

    skip: (currPage - 1) * pageSize,
    take: pageSize
  })

  const taskCount = await prisma.task.count({
    orderBy: [
      ...(searchParams.sortDeadlineFirst
        ? [
            { deadline: (searchParams.DeadlineSortInDesc ? 'desc' : 'asc') as 'desc' | 'asc' },
            { createdAt: (searchParams.createdSortInAsc ? 'asc' : 'desc') as 'desc' | 'asc' }
          ]
        : [
            { createdAt: (searchParams.createdSortInAsc ? 'asc' : 'desc') as 'desc' | 'asc' },
            { deadline: (searchParams.DeadlineSortInDesc ? 'desc' : 'asc') as 'desc' | 'asc' }
          ])
    ],

    where: {
      ...(searchParams.teamId && { teamId: parseInt(searchParams.teamId) }),
      ...(searchParams.status && { status: searchParams.status }),
      ...(searchParams.priority && { priority: searchParams.priority }),
      ...(searchParams.title && { title: { startsWith: searchParams.title, mode: 'insensitive' } }),
      ...(searchParams.late && {
        deadline: { lte: new Date() },
        status: searchParams.status
          ? { not: Status.CLOSED, equals: searchParams.status }
          : { not: Status.CLOSED }
      })
    }
  })

  const teams = await prisma.team.findMany({
    orderBy: {
      id: 'asc'
    }
  })

  return (
    <div className='space-y-5'>
      <div className='flex justify-between'>
        <TaskFilter teams={teams} status={searchParams.status} />
        <div className='flex gap-5 items-end'>
          <CreateTask />
          <TeamForm teams={teams} />
        </div>
      </div>
      <TasksTable tasks={tasks} />
      <Pagination itemCount={taskCount} currentPage={currPage} pageSize={pageSize} />
    </div>
  )
}

export default TasksPage
export const metadata: Metadata = {
  title: 'Task Tracker List',
  description: 'List of all tasks'
}
