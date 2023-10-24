import { Priority, Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const statusMap: Record<Status, { label: string; color: 'red' | 'blue' | 'green' | 'orange' }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'blue' },
  CLOSED: { label: 'Closed', color: 'green' },
  HELP_NEEDED: { label: 'Help Needed', color: 'orange' }
}

const priorityMap: Record<Priority, { label: string; color: 'red' | 'blue' | 'green' }> = {
  LOW: { label: 'Low', color: 'green' },
  MEDIUM: { label: 'Medium', color: 'blue' },
  HIGH: { label: 'High', color: 'red' }
}

const TaskStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge size="2" color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  )
}

const TaskPriorityBadge = ({ priority }: { priority: Priority }) => {
  return (
    <Badge size="2" color={priorityMap[priority].color}>
      {priorityMap[priority].label}
    </Badge>
  )
}

export { TaskStatusBadge, TaskPriorityBadge }
