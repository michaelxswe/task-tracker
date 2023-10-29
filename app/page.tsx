import prisma from '@/prisma/client'
import { LatestTasks } from './LatestTasks'
import { TaskSummary } from './TaskSummary'
import { Status } from '@prisma/client'
import { TaskChart } from './TaskChart'
import { Grid } from '@radix-ui/themes'

const HomePage = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
    take: 7
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
    <Grid columns='2' gap='9' mt='9'>
      <div className=' flex-col space-y-9'>
        <TaskSummary open={open} inProgress={inProgress} helpNeeded={helpNeeded} closed={closed}></TaskSummary>
        <TaskChart open={open} inProgress={inProgress} helpNeeded={helpNeeded} closed={closed}></TaskChart>
      </div>
      <LatestTasks tasks={tasks} />
    </Grid>
  )
}
export default HomePage
