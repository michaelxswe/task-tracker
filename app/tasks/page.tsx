import prisma from '@/prisma/client'
import Link from 'next/link'
import {TasksTable} from './components/TasksTable'

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
          <button className=" w-28 h-10 cursor-default  rounded-md bg-[#6366f1] font-medium hover:bg-[#818cf8]">Create Task</button>
        </Link>
      </div>
      <TasksTable tasks={tasks} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
export default TasksPage
