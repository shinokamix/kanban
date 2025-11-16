'use client'

import { useCallback } from 'react'
import { useAppDispatch } from '@/providers/StoreProvider'
import { taskRemoved } from '@/entities/task'
import { deleteTaskApi } from '../api/deletetTask'

export function useDeleteTask() {
    const dispatch = useAppDispatch()

    const deleteTask = useCallback(
        async (id: string) => {
            await deleteTaskApi(id)
            dispatch(taskRemoved(id))
        },
        [dispatch],
    )

    return { deleteTask }
}
