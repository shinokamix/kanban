'use client'

import { useCallback } from 'react'
import { useAppDispatch } from '@/providers/StoreProvider'
import { taskAdded, type TaskStatus } from '@/entities/task'
import type { CreateTaskFormValues } from './schema'

export function useCreateTask(initialStatus: TaskStatus = 'todo') {
    const dispatch = useAppDispatch()

    const createTask = useCallback(
        (values: CreateTaskFormValues) => {
            // здесь мы на основе данных формы создаём полноценный Task
            dispatch(
                taskAdded({
                    id: crypto.randomUUID(),
                    title: values.title,
                    description: values.description ?? '',
                    status: initialStatus,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            )
        },
        [dispatch, initialStatus],
    )

    return { createTask }
}
