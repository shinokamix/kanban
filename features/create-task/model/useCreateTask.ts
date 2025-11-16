'use client'

import { useCallback } from 'react'
import { useAppDispatch } from '@/providers/StoreProvider'
import { taskAdded, type TaskStatus } from '@/entities/task'
import { createTaskApi } from '../api/createTask'
import type { CreateTaskFormValues } from './schema'

export function useCreateTask(initialStatus: TaskStatus = 'todo') {
    const dispatch = useAppDispatch()

    const createTask = useCallback(
        async (values: CreateTaskFormValues) => {
            const created = await createTaskApi({
                title: values.title,
                description: values.description ?? '',
                status: initialStatus,
            })

            dispatch(taskAdded(created))
        },
        [dispatch, initialStatus],
    )

    return { createTask }
}
