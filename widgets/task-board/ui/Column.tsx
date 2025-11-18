'use client'

import { type Task, type TaskStatus } from '@/entities/task'
import { TaskCard } from '@/features/task-details'
import { TaskDetailsDialog } from '@/features/task-details'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'

type ColumnProps = {
    tasks: Task[]
    id: TaskStatus
}

export default function Column({ tasks, id }: ColumnProps) {
    const { setNodeRef } = useDroppable({
        id,
    })

    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)

    const handleOpenDetails = (taskId: string) => {
        setSelectedTaskId(taskId)
        setDetailsOpen(true)
    }

    const handleDialogOpenChange = (open: boolean) => {
        if (!open) {
            setDetailsOpen(false)
            setSelectedTaskId(null)
        } else {
            setDetailsOpen(true)
        }
    }

    return (
        <SortableContext id={id} items={tasks} strategy={rectSortingStrategy}>
            <ul
                className={`${
                    id === 'todo'
                        ? 'bg-gray-50'
                        : id === 'in-progress'
                          ? 'bg-blue-50'
                          : 'bg-green-50'
                } p-3 min-h-136 rounded-xl flex flex-col gap-[0.5dvh]`}
                ref={setNodeRef}
            >
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <TaskCard task={task} onOpenDetails={handleOpenDetails} />
                        </li>
                    )
                })}
            </ul>
            {selectedTaskId && (
                <TaskDetailsDialog
                    taskId={selectedTaskId}
                    open={detailsOpen}
                    onOpenChange={handleDialogOpenChange}
                />
            )}
        </SortableContext>
    )
}
