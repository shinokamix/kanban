'use client'

import { useCallback } from 'react'
import { useAppDispatch } from '@/app/providers/StoreProvider'
import { taskAdded } from '@/entities/task'
import type { TaskStatus } from '@/entities/task'

type CreateTaskButtonProps = {
    initialStatus?: TaskStatus
}

export function CreateTaskButton({ initialStatus = 'todo' }: CreateTaskButtonProps) {
    const dispatch = useAppDispatch()

    const handleClick = useCallback(() => {
        dispatch(
            taskAdded({
                id: crypto.randomUUID(),
                title: 'New Task',
                description: '',
                status: initialStatus,
                createdAt: new Date().toISOString(),
            }),
        )
    }, [dispatch, initialStatus])

    return (
        <button
            onClick={handleClick}
            className="w-fit rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
            Create Task
        </button>
    )
}
