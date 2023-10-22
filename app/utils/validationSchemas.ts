import { z } from "zod";


const taskSchema = z.object({
  title: z.string().min(1, "Invalid title"),
  description: z.string().min(1, "Invalid description"),
  dueDate: z.string().datetime()
});

export { taskSchema };
