'use client'

import { useState } from 'react'
import type { TaskStatus } from '@/entities/task'

import { Button } from '@/shared/ui/button'
import { CreateTaskDialog } from './CreateTaskDialog'

type CreateTaskButtonProps = {
    initialStatus?: TaskStatus
}

export function CreateTaskButton({ initialStatus = 'todo' }: CreateTaskButtonProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>New Task</Button>

            <CreateTaskDialog open={open} onOpenChange={setOpen} initialStatus={initialStatus} />
        </>
    )
}
