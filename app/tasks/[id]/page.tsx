import {
  TaskPriorityBadge,
  TaskStatusBadge,
} from "@/app/tasks/_components/TaskBadge";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Grid, Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <Grid columns="2">
      <Box>
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

        <Card>
          <p className="font-sans  text-lg">{task.description}</p>
        </Card>
      </Box>
      <Box>
        <Button color="sky">
          <Link href={`/tasks/${id}/edit`}>Edit</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
