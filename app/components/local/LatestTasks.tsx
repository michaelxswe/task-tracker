"use client"
import { Table } from "@radix-ui/themes"
import { TaskStatusBadge } from "../../tasks/components/TaskBadge"
import { useRouter } from "next/navigation"
import { Task } from "@prisma/client"

const LatestTasks = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter()
  return (
    <Table.Root variant="surface" size="3">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Latest Tasks</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tasks.map((task) => (
          <Table.Row
            key={task.id}
            className="transition-colors duration-200 hover:bg-gray-800 cursor-pointer"
            onClick={() => {
              router.push(`/tasks/${task.id}`)
            }}
          >
            <Table.Cell>
              <div className="flex justify-between items-center h-[75px]">
                {task.title}
                <TaskStatusBadge status={task.status} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export { LatestTasks }
