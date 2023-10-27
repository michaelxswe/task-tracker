import prisma from '@/prisma/client'
import { TaskForm } from '../components/TaskForm'

const NewTaskPage = async () => {
  const teams = await prisma.team.findMany(
    {orderBy: {
      id: 'asc' 
    }}
  )

  return <TaskForm teams={teams} />
}


export const dynamic = 'force-dynamic'
export default NewTaskPage