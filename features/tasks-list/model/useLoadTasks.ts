'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/providers/StoreProvider'
import { tasksAddedMany, tasksCleared } from '@/entities/task'
import { fetchTasksApi } from '../api/fetchTasks'

export function useLoadTasks() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function load() {
            const tasks = await fetchTasksApi()
            dispatch(tasksCleared())
            dispatch(tasksAddedMany(tasks))
        }

        load()
    }, [dispatch])
}
