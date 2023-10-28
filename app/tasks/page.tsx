import prisma from '@/prisma/client'
import Link from 'next/link'
import { TasksTable } from './components/TasksTable'
import { TeamForm } from '../teams/components/TeamForm'
import { TaskFilter } from './components/TaskFilter'
import { Priority, Status } from '@prisma/client'

interface Props {
  searchParams: {
    status?: Status
    priority?: Priority
    teamId?: string
    createdSortOrder?: 'asc' | 'desc'
    deadlineSortOrder?: 'asc' | 'desc'
    sortFirst?: 'created' | 'deadline'
    late?: 'false' | 'true'
    title?: string
  }
}

const TasksPage = async ({ searchParams }: Props) => {

  const tasks = await prisma.task.findMany({
    include: {
      team: true
    },

    orderBy: [
      ...(searchParams.sortFirst && searchParams.sortFirst == 'deadline'
        ? [{ deadline: searchParams?.deadlineSortOrder ?? 'desc' }, { createdAt: searchParams?.createdSortOrder ?? 'desc' }]
        : [{ createdAt: searchParams?.createdSortOrder ?? 'desc' }, { deadline: searchParams?.deadlineSortOrder ?? 'desc' }])
    ],

    where: {
      ...(searchParams.title && { title: { startsWith: searchParams.title, mode: 'insensitive' } }),
      status: searchParams.status,
      priority: searchParams.priority,
      ...(searchParams.teamId && { teamId: parseInt(searchParams.teamId) }),
      ...(searchParams?.late === 'true' && { deadline: { lte: new Date() } })
    }
  })

  const teams = await prisma.team.findMany({
    orderBy: {
      id: 'desc'
    }
  })

  return (
    <div>
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
    </div>
  )
}

export default TasksPage
