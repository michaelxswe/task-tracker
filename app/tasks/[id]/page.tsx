import { TaskStatusBadge } from "@/app/tasks/_components/TaskBadge";
import prisma from "@/prisma/client";
import { Flex, Heading, Text, Card, Grid, Box, Button } from "@radix-ui/themes";
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
        <Heading>{task.title}</Heading>
        <Flex className="space-x-4 mt-4 mb-6">
          <TaskStatusBadge status={task.status} />
          <Text>{task.createdAt.toDateString()}</Text>
        </Flex>
        <Card>
          <Text>{task.description}</Text>
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
