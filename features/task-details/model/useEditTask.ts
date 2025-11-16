'use client'

import { useCallback } from 'react'
import { useAppDispatch } from '@/providers/StoreProvider'
import { taskUpdated, type Task } from '@/entities/task'
import { updateTaskApi } from '../api/updateTask'
import type { EditTaskFormValues } from './schema'

export function useEditTask(task: Task | undefined) {
    const dispatch = useAppDispatch()

    const editTask = useCallback(
        async (values: EditTaskFormValues) => {
            if (!task) return

            const updated = await updateTaskApi({
                id: task.id,
                title: values.title,
                description: values.description,
                status: values.status,
            })

            dispatch(
                taskUpdated({
                    id: updated.id,
                    changes: updated,
                }),
            )
        },
        [dispatch, task],
    )

    return { editTask }
}
