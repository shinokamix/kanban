'use client'

import { useCallback } from 'react'
import { useAppDispatch } from '@/providers/StoreProvider'
import { taskUpdated, type Task } from '@/entities/task'
import type { EditTaskFormValues } from './schema'

export function useEditTask(task: Task | undefined) {
    const dispatch = useAppDispatch()

    const editTask = useCallback(
        (values: EditTaskFormValues) => {
            if (!task) return

            dispatch(
                taskUpdated({
                    id: task.id,
                    changes: {
                        title: values.title,
                        description: values.description ?? '',
                        status: values.status,
                        updatedAt: new Date().toISOString(),
                    },
                }),
            )
        },
        [dispatch, task],
    )

    return { editTask }
}
