"use client";

import { Button, TextArea, TextField, Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/app/utils/validationSchemas";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";
import { Status, Task } from "@prisma/client";

const TaskForm = ({ task }: { task?: Task }) => {
  const router = useRouter();

  const [taskStatus, setTaskStatus] = useState<Status>(Status.OPEN);

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

      if (task) {
        await axios.patch(`/api/tasks/${task.id}`, {...data, status: taskStatus});
      } else {
        await axios.post("/api/tasks", { ...data, status: taskStatus });
      }

      router.push("/tasks");
    } catch (error) {
      setSubmitting(false);
      if (axios.isAxiosError(error) && error.response?.data?.ErrorMessage) {
        setError(error.response?.data?.ErrorMessage);
      }
      else{
        setError("Unexpected error, please try again later!");
      }
    }
  });

  return (
    <div className="max-w-xl space-y-3">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={task?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <TextArea
          className="h-52"
          defaultValue={task?.description}
          placeholder="Description"
          {...register("description")}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}

        <div className="flex items-center justify-between">
          <Select.Root
            defaultValue={task ? task.status : Status.OPEN}
            size="3"
            onValueChange={(value) => setTaskStatus(value as Status)}
          >
            <Select.Trigger />
            <Select.Content position="popper">
              <Select.Item value={Status.OPEN}>Open</Select.Item>
              <Select.Item value={Status.IN_PROGRESS}>In Progress</Select.Item>
              <Select.Item value={Status.CLOSED}>Closed</Select.Item>
            </Select.Content>
          </Select.Root>

          <Button color="sky" disabled={submitting}>
            Submit{submitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export { TaskForm };
