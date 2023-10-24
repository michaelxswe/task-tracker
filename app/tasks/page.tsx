import prisma from '@/prisma/client'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import TasksTable from './_components/TasksTable'

const TasksPage = async () => {
  const tasks = await prisma.task.findMany({
    include: {
      team: true
    }
  })

  return (
    <div>
      <div className="mb-6">
        <Link href="/tasks/new">
          <Button size="3" color="iris">
            Create Task
          </Button>
        </Link>
      </div>
      <TasksTable tasks={tasks} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
export default TasksPage
