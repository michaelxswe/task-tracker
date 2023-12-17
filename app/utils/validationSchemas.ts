import { z } from "zod"
const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(40, "Title is too long"),
  description: z.string().min(1, "Description is required"),
  deadline: z
    .string()
    .min(1, "Date is required")
    .refine(
      (date) => {
        const dateFormat = /^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](\d{4})$/ // MM/DD/YYYY

        if (!dateFormat.test(date)) return false

        const [month, day, year] = date.split("/").map(Number)
        const parsedDate = new Date(year, month - 1, day)

        return (
          parsedDate.getFullYear() === year &&
          parsedDate.getMonth() === month - 1 &&
          parsedDate.getDate() === day
        )
      },
      {
        message: "Invalid date"
      }
    )
    .transform((date) => {
      const [month, day, year] = date.split("/")
      const localDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      localDate.setHours(23, 59, 0, 0)
      return new Date(localDate.toISOString())
    })
})

const teamSchema = z.object({
  name: z.string().min(1, "Name is required").max(10, "Name is too long")
})

export { taskSchema, teamSchema }
