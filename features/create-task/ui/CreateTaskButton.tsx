'use client'

import { useCallback } from 'react'
import { useAppDispatch } from '@/providers/StoreProvider'
import { taskAdded } from '@/entities/task'
import type { TaskStatus } from '@/entities/task'
import { Button } from '@/shared/ui/button'

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

    return <Button onClick={handleClick}>Create Task</Button>
}
