'use client'

import { useState } from 'react'
import { useAppSelector } from '@/providers/StoreProvider'
import { taskSelectors, type Task } from '@/entities/task'
import { useEditTask } from '../model/useEditTask'
import { useDeleteTask } from '../model/useDeleteTask'
import { EditTaskForm } from './EditTaskForm'
import { TaskDetailsView } from './TaskDetailsView'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import type { EditTaskFormValues } from '../model/schema'

type TaskDetailsDialogProps = {
    taskId: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function TaskDetailsDialog({ taskId, open, onOpenChange }: TaskDetailsDialogProps) {
    const task = useAppSelector((state) => taskSelectors.selectById(state, taskId)) as
        | Task
        | undefined

    const [isEditing, setIsEditing] = useState(false)

    const { editTask } = useEditTask(task)
    const { deleteTask } = useDeleteTask()

    if (!task) {
        return null
    }

    const handleEditSubmit = (values: EditTaskFormValues) => {
        editTask(values)
        setIsEditing(false)
    }

    const handleConfirmDelete = async () => {
        await deleteTask(task.id)
        onOpenChange(false)
    }

    const handleDialogOpenChange = (value: boolean) => {
        if (!value) {
            setIsEditing(false)
        }
        onOpenChange(value)
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle data-testid="task-details-title">Task details</DialogTitle>
                </DialogHeader>

                {isEditing ? (
                    <EditTaskForm
                        task={task}
                        onSubmit={handleEditSubmit}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <TaskDetailsView
                        task={task}
                        onEdit={() => setIsEditing(true)}
                        onConfirmDelete={handleConfirmDelete}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}
