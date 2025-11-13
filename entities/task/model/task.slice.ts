import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Task, TaskStatus } from './task.types'

interface TasksState {
    items: Task[]
}

const initialState: TasksState = {
    items: [],
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskAdded(state, action: PayloadAction<Task>) {
            state.items.push(action.payload)
        },
        taskUpdated(state, action: PayloadAction<Task>) {
            const index = state.items.findIndex((t) => t.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
        },
        taskRemoved(state, action: PayloadAction<string>) {
            state.items = state.items.filter((t) => t.id !== action.payload)
        },
        taskStatusChanged(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
            const task = state.items.find((t) => t.id === action.payload.id)
            if (task) {
                task.status = action.payload.status
                task.updatedAt = new Date().toISOString()
            }
        },
    },
})

export const { taskAdded, taskUpdated, taskRemoved, taskStatusChanged } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer
