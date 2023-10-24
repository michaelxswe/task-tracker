import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { TaskForm } from '../../components/TaskForm'

const TaskEditPage = async ({ params: { id } }: { params: { id: string } }) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
    include: { team: true }
  })

  const teams = await prisma.team.findMany()

  if (!task) {
    notFound()
  }

  return <TaskForm task={task} teams={teams} />
}

export default TaskEditPage
