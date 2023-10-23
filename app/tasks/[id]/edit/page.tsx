import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import {TaskForm} from "../../_components/TaskForm";

const TaskEditPage = async ({ params: { id } }: { params: { id: string } }) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });

  if (!task) {
    notFound();
  }

  return <TaskForm task={task} />;


};

export default TaskEditPage;
