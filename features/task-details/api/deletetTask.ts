import { api } from '@/shared/api/base'

export async function deleteTaskApi(id: string): Promise<void> {
    await api.delete('/tasks', { data: { id } })
}
