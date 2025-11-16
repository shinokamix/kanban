import { z } from 'zod'

export const TaskStatusSchema = z.enum(['todo', 'in-progress', 'done'])

export const TaskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: TaskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type Task = z.infer<typeof TaskSchema>
export type TaskStatus = z.infer<typeof TaskStatusSchema>
