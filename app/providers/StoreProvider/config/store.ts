import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from '@/entities/task'

export const makeStore = () => {
    return configureStore({
        reducer: {
            tasks: tasksReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
