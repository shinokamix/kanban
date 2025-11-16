import { z } from 'zod'
import { TaskStatusSchema } from '@/entities/task'

export const editTaskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    status: TaskStatusSchema,
})

export type EditTaskFormValues = z.infer<typeof editTaskSchema>
