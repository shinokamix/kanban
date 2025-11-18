import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from '@/entities/task'
import { taskBoardReducer } from '@/widgets/task-board'

export const makeStore = () => {
    return configureStore({
        reducer: {
            tasks: tasksReducer,
            taskBoard: taskBoardReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
