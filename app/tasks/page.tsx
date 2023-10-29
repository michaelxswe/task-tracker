import prisma from '@/prisma/client'
import Link from 'next/link'
import { TasksTable } from './components/TasksTable'
import { TeamForm } from '../teams/components/TeamForm'
import { TaskFilter } from './components/TaskFilter'
import { Priority, Status } from '@prisma/client'
import { Pagination } from '../components/Pagination'
import { Metadata } from 'next'

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
        ? [{ deadline: (searchParams.DeadlineSortInDesc ? 'desc' : 'asc') as 'desc' | 'asc' }, { createdAt: (searchParams.createdSortInAsc ? 'asc' : 'desc') as 'desc' | 'asc' }]
        : [{ createdAt: (searchParams.createdSortInAsc ? 'asc' : 'desc') as 'desc' | 'asc' }, { deadline: (searchParams.DeadlineSortInDesc ? 'desc' : 'asc') as 'desc' | 'asc' }])
    ],

    where: {
      ...(searchParams.teamId && { teamId: parseInt(searchParams.teamId) }),
      ...(searchParams.status && { status: searchParams.status }),
      ...(searchParams.priority && { priority: searchParams.priority }),
      ...(searchParams.title && { title: { startsWith: searchParams.title, mode: 'insensitive' } }),
      ...(searchParams.late && { deadline: { lte: new Date() } })
    },

    skip: (currPage - 1) * pageSize,
    take: pageSize
  })

  const taskCount = await prisma.task.count({
    orderBy: [
      ...(searchParams.sortDeadlineFirst
        ? [{ deadline: (searchParams.DeadlineSortInDesc ? 'desc' : 'asc') as 'desc' | 'asc' }, { createdAt: (searchParams.createdSortInAsc ? 'asc' : 'desc') as 'desc' | 'asc' }]
        : [{ createdAt: (searchParams.createdSortInAsc ? 'asc' : 'desc') as 'desc' | 'asc' }, { deadline: (searchParams.DeadlineSortInDesc ? 'desc' : 'asc') as 'desc' | 'asc' }])
    ],

    where: {
      ...(searchParams.teamId && { teamId: parseInt(searchParams.teamId) }),
      ...(searchParams.status && { status: searchParams.status }),
      ...(searchParams.priority && { priority: searchParams.priority }),
      ...(searchParams.title && { title: { startsWith: searchParams.title, mode: 'insensitive' } }),
      ...(searchParams.late && { deadline: { lte: new Date() } })
    }
  })

  const teams = await prisma.team.findMany({
    orderBy: {
      id: 'asc'
    }
  })

  return (
    <div className=' space-y-4'>
      <div className='mb-6 flex justify-between'>
        <TaskFilter teams={teams} />
        <div className='flex gap-3 items-end'>
          <TeamForm teams={teams} />
          <Link href='/tasks/new'>
            <button className=' w-28 h-10 cursor-default  rounded-md bg-[#0077ff3a] font-medium hover:bg-[#0077ff5a]'>Create Task</button>
          </Link>
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
