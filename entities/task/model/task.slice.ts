// entities/task/model/task.slice.ts
import { createSlice, createEntityAdapter, type PayloadAction } from '@reduxjs/toolkit'
import type { Task, TaskStatus } from './task.types'

// Entity adapter для Task
export const tasksAdapter = createEntityAdapter<Task>({
    // опционально: сортировка по createdAt, новые выше
    sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
})

// базовый стейт: { ids: [], entities: {} }
const initialState = tasksAdapter.getInitialState()

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // payload: Task
        taskAdded: tasksAdapter.addOne,

        // payload: Task[]
        tasksAddedMany: tasksAdapter.addMany,

        // payload: { id: string; changes: Partial<Task> }
        taskUpdated: tasksAdapter.updateOne,

        // payload: string (id)
        taskRemoved: tasksAdapter.removeOne,

        // payload: { id: string; status: TaskStatus }
        taskStatusChanged(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
            const { id, status } = action.payload

            tasksAdapter.updateOne(state, {
                id,
                changes: {
                    status,
                    updatedAt: new Date().toISOString(),
                },
            })
        },

        // опционально: очистить все таски
        tasksCleared: tasksAdapter.removeAll,
    },
})

export const {
    taskAdded,
    tasksAddedMany,
    taskUpdated,
    taskRemoved,
    taskStatusChanged,
    tasksCleared,
} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer
