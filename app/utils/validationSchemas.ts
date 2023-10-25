import { z } from 'zod'

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(40, 'Title is too long'),
  description: z.string().min(1, 'Description is required'),
  deadline: z.string().datetime()
})

const teamSchema = z.object({
  name: z.string().min(1, 'Name is required').max(10, "Name is too long")
})

export { taskSchema, teamSchema }