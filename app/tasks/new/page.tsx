import prisma from '@/prisma/client'
import { TaskForm } from '../_components/TaskForm'

const NewTaskPage = async () => {
  const teams = await prisma.team.findMany()

  return <TaskForm teams={teams} />
}
export default NewTaskPage
