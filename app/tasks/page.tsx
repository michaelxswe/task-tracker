import prisma from "@/prisma/client";
import { Button} from "@radix-ui/themes";
import Link from "next/link";
import TasksTable from "./_components/TasksTable";


const TasksPage = async () => {
  const tasks = await prisma.task.findMany();

  return (
    <div>
      <div className="mb-6">
        <Button color="sky">
          <Link href="/tasks/new">New Task</Link>
        </Button>
      </div>
      <TasksTable tasks={tasks}/>
    </div>
  );
};

export default TasksPage;
