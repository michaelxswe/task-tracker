import prisma from "@/prisma/client"
import { TaskForm } from "../components/TaskForm"
import { Metadata } from "next"

const NewTaskPage = async () => {
  const teams = await prisma.team.findMany({
    orderBy: {
      id: "asc"
    }
  })

  return <TaskForm teams={teams} />
}

export const dynamic = "force-dynamic"
export default NewTaskPage

export const metadata: Metadata = {
  title: "Create New Task",
  description: "Create New Task"
}
