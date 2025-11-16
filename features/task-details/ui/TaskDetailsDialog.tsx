'use client'

import { useState } from 'react'
import { useAppSelector } from '@/providers/StoreProvider'
import { taskSelectors, type Task } from '@/entities/task'
import { useEditTask } from '../model/useEditTask'
import { EditTaskForm } from './EditTaskForm'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'

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

    if (!task) return null

    const handleEditSubmit = (values: Parameters<typeof editTask>[0]) => {
        editTask(values)
        setIsEditing(false)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) setIsEditing(false)
                onOpenChange(value)
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Task details</DialogTitle>
                </DialogHeader>

                {!isEditing ? (
                    <div className="space-y-3 text-sm">
                        <div>
                            <div className="text-xs text-muted-foreground">Title</div>
                            <div className="font-medium">{task.title}</div>
                        </div>

                        <div>
                            <div className="text-xs text-muted-foreground">Description</div>
                            <div>{task.description || 'No description'}</div>
                        </div>

                        <div>
                            <div className="text-xs text-muted-foreground">Status</div>
                            <div className="font-medium">{task.status}</div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div>
                                <div className="text-xs text-muted-foreground">
                                    Created at:{' '}
                                    <span className="font-medium">
                                        {new Date(task.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                {task.createdAt === task.updatedAt ? (
                                    ''
                                ) : (
                                    <div className="text-xs text-muted-foreground">
                                        Updated at:{' '}
                                        <span className="font-medium">
                                            {new Date(task.updatedAt).toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <Button size="sm" onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>
                        </div>
                    </div>
                ) : (
                    <EditTaskForm
                        task={task}
                        onSubmit={handleEditSubmit}
                        onCancel={() => setIsEditing(false)}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}
