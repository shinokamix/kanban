import { api } from '@/shared/api/base'
import type { Task, TaskStatus } from '@/entities/task'

export type CreateTaskDto = {
    title: string
    description?: string
    status?: TaskStatus
}

export async function createTaskApi(dto: CreateTaskDto): Promise<Task> {
    const res = await api.post<Task>('/tasks', dto)
    return res.data
}
