'use client'

import { useState } from 'react'
import type { Task } from '@/entities/task'
import { TaskItem } from '@/entities/task'
import { TaskDetailsDialog } from './TaskDetailsDialog'

type TaskCardWithDetailsProps = {
    task: Task
}

export function TaskCard({ task }: TaskCardWithDetailsProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <TaskItem task={task} onClick={() => setOpen(true)} />
            <TaskDetailsDialog taskId={task.id} open={open} onOpenChange={setOpen} />
        </>
    )
}
