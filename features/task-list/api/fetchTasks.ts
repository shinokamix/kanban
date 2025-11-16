import { api } from '@/shared/api/base'
import type { Task } from '@/entities/task'

export async function fetchTasksApi(): Promise<Task[]> {
    const res = await api.get<Task[]>('/tasks')
    return res.data
}
