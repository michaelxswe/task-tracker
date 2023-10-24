import prisma from '@/prisma/client'
import Link from 'next/link'
import {TasksTable} from './components/TasksTable'
import { Team } from './components/Team'

const TasksPage = async () => {
  const tasks = await prisma.task.findMany({
    include: {
      team: true
    }
  })

  return (
    <div>
      <div className="mb-6 space-x-3">
        <Link href="/tasks/new">
          <button className=" w-28 h-10 cursor-default  rounded-md bg-[#0077ff3a] font-medium hover:bg-[#0077ff5a]">Create Task</button>
        </Link>
        <Team />
      </div>
      <TasksTable tasks={tasks} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
export default TasksPage
