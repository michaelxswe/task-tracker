// "use client";

// import { Button, TextArea, TextField, Select } from "@radix-ui/themes";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { taskSchema } from "@/app/utils/validationSchemas";
// import { ErrorMessage } from "@/app/components/ErrorMessage";
// import { Spinner } from "@/app/components/Spinner";
// import { Priority, Status, Task } from "@prisma/client";

// const TaskForm = ({ task }: { task?: Task }) => {
//   const router = useRouter();

//   const [taskStatus, setTaskStatus] = useState<Status>(Status.OPEN);
//   const [taskPriority, setTaskPriority] = useState<Priority>(Priority.MEDIUM);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Task>({ resolver: zodResolver(taskSchema) });

//   const [error, setError] = useState("");

//   const [submitting, setSubmitting] = useState(false);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       setSubmitting(true);

//       const taskData = { ...data, status: taskStatus, priority: taskPriority };

//       if (task) {
//         await axios.patch(`/api/tasks/${task.id}`, taskData);
//       } else {
//         await axios.post("/api/tasks", taskData);
//       }

//       router.push("/tasks");
//     } catch (error) {
//       setSubmitting(false);
//       if (axios.isAxiosError(error) && error.response?.data?.ErrorMessage) {
//         setError(error.response?.data?.ErrorMessage);
//       }
//       else{
//         setError("Unexpected error, please try again later!");
//       }
//     }
//   });

//   return (
//     <div className="max-w-xl mt-6">
//       {error && <ErrorMessage>{error}</ErrorMessage>}

//       <form className="space-y-6" onSubmit={onSubmit}>

//         <TextField.Root>
//           <TextField.Input defaultValue={task?.title} placeholder="Title" {...register("title")}/>
//         </TextField.Root>
//         {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

//         <TextArea className="h-52" defaultValue={task?.description} placeholder="Description" {...register("description")} />
//         {errors.description && (<ErrorMessage>{errors.description.message}</ErrorMessage>)}

//         <div className="flex items-center justify-between">

//           <div className = "flex gap-4">
//             <Select.Root
//               defaultValue={task ? task.status : Status.OPEN}
//               size="3"
//               onValueChange={(value) => setTaskStatus(value as Status)}
//             >
//               <Select.Trigger />
//               <Select.Content position="popper">
//                 <Select.Item value={Status.OPEN}>Status: Open</Select.Item>
//                 <Select.Item value={Status.IN_PROGRESS}>Status: In Progress</Select.Item>
//                 <Select.Item value={Status.CLOSED}>Status: Closed</Select.Item>
//               </Select.Content>
//             </Select.Root>

//             <Select.Root
//               defaultValue={task ? task.priority : Priority.MEDIUM}
//               size="3"
//               onValueChange={(value) => setTaskPriority(value as Priority)}
//             >
//               <Select.Trigger />
//               <Select.Content position="popper">
//                 <Select.Item value={Priority.LOW}>Priority: Low</Select.Item>
//                 <Select.Item value={Priority.MEDIUM}>Priority: Medium</Select.Item>
//                 <Select.Item value={Priority.HIGH}>Priority: High</Select.Item>
//               </Select.Content>
//             </Select.Root>
//           </div>

//           <Button size = "3" color="sky" disabled={submitting}>
//             Submit{submitting && <Spinner />}
//           </Button>

//         </div>

//       </form>

//     </div>
//   );
// };

// export { TaskForm };










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
import { Priority, Status, Task } from "@prisma/client";

const TaskForm = ({ task }: { task?: Task }) => {
  const router = useRouter();

  const [taskStatus, setTaskStatus] = useState<Status>(Status.OPEN);
  const [taskPriority, setTaskPriority] = useState<Priority>(Priority.MEDIUM);

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
        setError("Unexpected error, please try again later!");
      }
    }
  });

  return (
    <div className="mt-6 max-w-xl">
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form className="space-y-6" onSubmit={onSubmit}>
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

        <div className="space-y-1">
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
                <Select.Item value={Priority.MEDIUM}>
                  Medium
                </Select.Item>
                <Select.Item value={Priority.HIGH}>High</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        <Button size="3" color="sky" disabled={submitting}>
          Submit{submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export { TaskForm };