'use client'

import { CreateTaskForm } from './CreateTaskForm'
import { useCreateTask } from '../model/useCreateTask'
import type { TaskStatus } from '@/entities/task'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'

type CreateTaskDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialStatus?: TaskStatus
}

export function CreateTaskDialog({
    open,
    onOpenChange,
    initialStatus = 'todo',
}: CreateTaskDialogProps) {
    const { createTask } = useCreateTask(initialStatus)

    const handleSubmit = (values: Parameters<typeof createTask>[0]) => {
        createTask(values)
        onOpenChange(false)
    }

    const handleCancel = () => {
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                </DialogHeader>

                <CreateTaskForm onSubmit={handleSubmit} onCancel={handleCancel} />
            </DialogContent>
        </Dialog>
    )
}
