import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Task, TaskStatus } from '@/entities/task'

const COLUMNS: TaskStatus[] = ['todo', 'in-progress', 'done']

type ColumnsState = Record<TaskStatus, string[]>

interface TaskBoardState {
    columns: ColumnsState
    activeId: string | null
    activeStartColumn: TaskStatus | null
}

const initialState: TaskBoardState = {
    columns: {
        todo: [],
        'in-progress': [],
        done: [],
    },
    activeId: null,
    activeStartColumn: null,
}

export const taskBoardSlice = createSlice({
    name: 'taskBoard',
    initialState,
    reducers: {
        // то, что раньше было в useEffect по изменениям tasks
        syncColumnsWithTasks(state, action: PayloadAction<Task[]>) {
            const tasks = action.payload
            const prev = state.columns
            const next: ColumnsState = { ...prev }

            COLUMNS.forEach((status) => {
                const fromStore = tasks
                    .filter((t) => t.status === status)
                    .map((t) => t.id.toString())

                const existing = prev[status] ?? []

                const merged = [
                    ...existing.filter((id) => fromStore.includes(id)),
                    ...fromStore.filter((id) => !existing.includes(id)),
                ]

                next[status] = merged
            })

            state.columns = next
        },

        // DnD-перенос между колонками (то, что у тебя в handleDragOver)
        moveBetweenColumns(
            state,
            action: PayloadAction<{
                activeId: string
                activeColumn: TaskStatus
                overId: string
                overColumn: TaskStatus
            }>,
        ) {
            const { activeId, activeColumn, overId, overColumn } = action.payload

            const activeItems = state.columns[activeColumn]
            const overItems = state.columns[overColumn]

            const activeIndex = activeItems.indexOf(activeId)
            const overIndex = overItems.indexOf(overId)

            let newIndex: number

            if (COLUMNS.includes(overId as TaskStatus)) {
                newIndex = overItems.length + 1
            } else {
                const isBelowLastItem = overIndex === overItems.length - 1
                const modifier = isBelowLastItem ? 1 : 0
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }

            state.columns[activeColumn] = activeItems.filter((id) => id !== activeId)
            state.columns[overColumn] = [
                ...overItems.slice(0, newIndex),
                activeItems[activeIndex],
                ...overItems.slice(newIndex),
            ]
        },

        // сортировка внутри одной колонки (arrayMove)
        moveWithinColumn(
            state,
            action: PayloadAction<{
                column: TaskStatus
                fromIndex: number
                toIndex: number
            }>,
        ) {
            const { column, fromIndex, toIndex } = action.payload
            const items = state.columns[column]
            if (fromIndex === toIndex) return

            const newItems = [...items]
            const [removed] = newItems.splice(fromIndex, 1)
            newItems.splice(toIndex, 0, removed)
            state.columns[column] = newItems
        },

        setActive(
            state,
            action: PayloadAction<{ id: string | null; startColumn: TaskStatus | null }>,
        ) {
            state.activeId = action.payload.id
            state.activeStartColumn = action.payload.startColumn
        },

        resetActive(state) {
            state.activeId = null
            state.activeStartColumn = null
        },
    },
})

export const {
    syncColumnsWithTasks,
    moveBetweenColumns,
    moveWithinColumn,
    setActive,
    resetActive,
} = taskBoardSlice.actions

export const taskBoardReducer = taskBoardSlice.reducer
