'use client'

import { TaskPriorityBadge, TaskStatusBadge } from '@/app/tasks/_components/TaskBadge'
import { Status, Task, Team } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const TasksTable = ({ tasks }: { tasks: ({ team: Team | null } & Task)[] }) => {
  const router = useRouter()

  const fields = ['Task', 'Team', 'Status', 'Priority', 'Created', 'Deadline']

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row className="">
          {fields.map((field, index) => (
            <Table.ColumnHeaderCell key={index}>
              <h3 className=" font-sans text-xl">{field}</h3>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasks.map((task) => (
          <Table.Row
            className="transition-colors duration-200 hover:bg-gray-800"
            key={task.id}
            onClick={() => {
              router.push(`/tasks/${task.id}`)
            }}
          >
            <Table.Cell>
              <p className="pt-1 text-base">{task.title}</p>
            </Table.Cell>
            <Table.Cell>
              <p className="pt-1 text-base">{task?.team?.name}</p>
            </Table.Cell>
            <Table.Cell>
              <TaskStatusBadge status={task.status} />
            </Table.Cell>
            <Table.Cell>
              <TaskPriorityBadge priority={task.priority} />
            </Table.Cell>
            <Table.Cell>
              <p className="pt-1 text-base">{task.createdAt.toDateString()}</p>
            </Table.Cell>
            <Table.Cell>
              <p className={`${task.status !== Status.CLOSED && task.deadline.getTime() <= new Date().getTime() ? 'pt-1 text-base text-red-700' : 'pt-1 text-base'}`}>{task.deadline.toDateString()}</p>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default TasksTable
