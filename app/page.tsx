import prisma from '@/prisma/client'
import { LatestTasks } from './components/local/LatestTasks'
import { TasksCard } from './components/local/TasksCard'
import { Status } from '@prisma/client'
import { TasksChart } from './components/local/TasksChart'
import { Metadata } from 'next'

const HomePage = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  const open = await prisma.task.count({
    where: { status: Status.OPEN }
  })

  const inProgress = await prisma.task.count({
    where: { status: Status.IN_PROGRESS }
  })

  const helpNeeded = await prisma.task.count({
    where: { status: Status.HELP_NEEDED }
  })

  const closed = await prisma.task.count({
    where: { status: Status.CLOSED }
  })

  return (
    <div className='grid grid-cols-12 gap-10'>
      <div className='space-y-10 col-span-8'>
        <TasksCard open={open} inProgress={inProgress} helpNeeded={helpNeeded} closed={closed}></TasksCard>
        <TasksChart open={open} inProgress={inProgress} helpNeeded={helpNeeded} closed={closed}></TasksChart>
      </div>
      <div className='col-span-4'>
        <LatestTasks tasks={tasks} />
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
export default HomePage
export const metadata: Metadata = {
  title: 'Task Tracker Dashboard',
  description: 'Summary of all tasks'
}
