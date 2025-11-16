import { api } from '@/shared/api/base'
import type { Task, TaskStatus } from '@/entities/task'

export type UpdateTaskDto = {
    id: string
    title?: string
    description?: string
    status?: TaskStatus
}

export async function updateTaskApi(dto: UpdateTaskDto): Promise<Task> {
    const res = await api.patch<Task>('/tasks', dto)
    return res.data
}
