import type { RootState } from '@/providers/StoreProvider'
import type { Task, TaskStatus } from './task.types'

export const selectTasks = (state: RootState) => state.tasks.items

export const selectTasksByStatus = (status: TaskStatus) => (state: RootState) =>
    state.tasks.items.filter((task: Task) => task.status === status)
