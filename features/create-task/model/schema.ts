import { z } from 'zod'

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Task title'),
    description: z.string().optional(),
})

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>
