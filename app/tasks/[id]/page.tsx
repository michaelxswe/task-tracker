import {
  TaskPriorityBadge,
  TaskStatusBadge,
} from "@/app/tasks/_components/TaskBadge";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Grid, Box } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "./_components/DeleteButton";
import ReactMarkDown from "react-markdown";

const TaskDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });

  if (!task) {
    notFound();
  }

  return (
    <Grid columns="6" gap="8">
      <Box className=" col-span-4">
        <h1 className=" text-3xl font-bold">{task.title}</h1>
        <div className="mb-4 mt-4 flex items-center justify-between">
          <div className="flex gap-4">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>
          <div>
            <p
              className={`${
                task.status !== Status.CLOSED &&
                task.dueDate.getTime() <= new Date().getTime()
                  ? "pt-1 text-base text-red-700"
                  : "pt-1 text-base"
              }`}
            >
              {task.dueDate.toDateString()}
            </p>
          </div>
        </div>

        <Card className="prose max-w-full text-white">
          <ReactMarkDown>{task.description}</ReactMarkDown>
        </Card>
      </Box>

      <Box className=" col-span-2">
        <div className="flex flex-col gap-5">
          <Link href={`/tasks/${id}/edit`} className=" w-full">
            <button className=" h-10 w-full cursor-default  rounded-md  bg-blue-500 font-medium hover:bg-blue-400">
              Edit
            </button>
          </Link>

          <DeleteButton id={id} />
        </div>
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
