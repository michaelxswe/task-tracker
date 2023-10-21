import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255, "Title is too long."),
  description: z.string().min(1, "Description is required."),
});

export { taskSchema };
