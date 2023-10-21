"use client";

import { TaskStatusBadge } from "@/app/tasks/_components/TaskStatusBadge";
import { Task } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasks.map((task) => (
          <Table.Row
            className="rounded px-2 py-2 transition-colors duration-200 hover:bg-gray-800"
            key={task.id}
            onClick={() => {
              router.push(`/tasks/${task.id}`);
            }}
          >
            <Table.Cell>{task.title}</Table.Cell>
            <Table.Cell>
              <TaskStatusBadge status={task.status} />
            </Table.Cell>
            <Table.Cell>{task.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TasksTable;
