import { Priority, Status } from "@prisma/client"
import { Badge } from "@radix-ui/themes";

const statusMap: Record<Status, { label: string; color: "red" | "violet" | "green" }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const priorityMap: Record<Priority,{ label: string; color: "red" | "violet" | "green" }> = {
  LOW: { label: "Low", color: "green" },
  MEDIUM: { label: "Medium", color: "violet" },
  HIGH: { label: "High", color: "red" },
};

const TaskStatusBadge = ({status}: {status: Status}) => {
  return (
    <Badge size = "2" color = {statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
}

const TaskPriorityBadge = ({ priority }: { priority: Priority }) => {
  return (
    <Badge size = "2" color={priorityMap[priority].color}>{priorityMap[priority].label}</Badge>
  );
};


export {TaskStatusBadge, TaskPriorityBadge}