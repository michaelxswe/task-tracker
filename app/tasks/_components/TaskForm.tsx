"use client";

import { Button, TextArea, TextField, Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/app/utils/validationSchemas";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";
import { Priority, Status, Task } from "@prisma/client";
import { convertToUTC } from "@/app/utils/timeCoversion";
import { taskExample } from "@/app/utils/placeHoder";

const TaskForm = ({ task }: { task?: Task }) => {

  const router = useRouter();

  const [taskStatus, setTaskStatus] = useState<Status>(Status.OPEN);
  const [taskPriority, setTaskPriority] = useState<Priority>(Priority.MEDIUM);

  useEffect(() => {
    if(task){
      setTaskStatus(task.status)
      setTaskPriority(task.priority)
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({ resolver: zodResolver(taskSchema) });

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {

      setSubmitting(true);
      const taskData = { ...data, status: taskStatus, priority: taskPriority };

      if (task) {
        await axios.patch(`/api/tasks/${task.id}`, taskData);
      } else {
        await axios.post("/api/tasks", taskData);
      }

      router.push("/tasks");
    } catch (error) {
      setSubmitting(false);
      if (axios.isAxiosError(error) && error.response?.data?.ErrorMessage) {
        setError(error.response?.data?.ErrorMessage);
      } else {
        setError("Unexpected error");
      }
    }
  });

  return (
    <div className="mt-6 max-w-xl space-y-4">
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <h5>Title</h5>
          <TextField.Root>
            <TextField.Input
              defaultValue={task?.title}
              placeholder={taskExample.title}
              {...register("title")}
            />
          </TextField.Root>
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>

        <div className="space-y-2">
          <h5>Description</h5>
          <TextArea
            className=" h-52"
            defaultValue={task?.description}
            placeholder={taskExample.description}
            {...register("description")}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <h5>Due Date</h5>
          <div className = " w-28">
            <TextField.Root>
              <TextField.Input
                defaultValue={task?.dueDate?.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                placeholder="MM/DD/YYYY"
                {...register("dueDate", {
                  setValueAs: (value) => convertToUTC(value),
                })}
              />
            </TextField.Root>
          </div>

          {errors.dueDate && (
            <ErrorMessage>{errors.dueDate.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <h5>Status</h5>
          <div>
            <Select.Root
              defaultValue={task ? task.status : Status.OPEN}
              size="3"
              onValueChange={(value) => setTaskStatus(value as Status)}
            >
              <Select.Trigger />
              <Select.Content position="popper">
                <Select.Item value={Status.OPEN}>Open</Select.Item>
                <Select.Item value={Status.IN_PROGRESS}>
                  In Progress
                </Select.Item>
                <Select.Item value={Status.CLOSED}>Closed</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        <div className="space-y-2">
          <div>Priority</div>
          <div>
            <Select.Root
              defaultValue={task ? task.priority : Priority.MEDIUM}
              size="3"
              onValueChange={(value) => setTaskPriority(value as Priority)}
            >
              <Select.Trigger />
              <Select.Content position="popper">
                <Select.Item value={Priority.LOW}>Low</Select.Item>
                <Select.Item value={Priority.MEDIUM}>Medium</Select.Item>
                <Select.Item value={Priority.HIGH}>High</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="3" color="sky" disabled={submitting}>
            Submit{submitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export { TaskForm };
