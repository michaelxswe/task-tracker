"use client";

import {
  TaskPriorityBadge,
  TaskStatusBadge,
} from "@/app/tasks/_components/TaskBadge";
import { Status, Task } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter();



  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <h3 className=" text-xl font-sans">Task</h3>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <h3 className=" text-xl font-sans">Status</h3>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <h3 className=" text-xl font-sans">Priority</h3>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <h3 className=" text-xl font-sans">Created</h3>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <h3 className=" text-xl font-sans">Due Date</h3>
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasks.map((task) => (
          <Table.Row
            className="transition-colors duration-200 hover:bg-gray-800"
            key={task.id}
            onClick={() => {
              router.push(`/tasks/${task.id}`);
            }}
          >
            <Table.Cell>
              <p className="pt-1 text-base">{task.title}</p>
            </Table.Cell>
            <Table.Cell>
              <TaskStatusBadge status={task.status} />
            </Table.Cell>
            <Table.Cell>
              <TaskPriorityBadge priority={task.priority} />
            </Table.Cell>
            <Table.Cell>
              <p className="pt-1 text-base">
                {task.createdAt.toDateString()}
              </p>
            </Table.Cell>
            <Table.Cell>
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
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TasksTable;



