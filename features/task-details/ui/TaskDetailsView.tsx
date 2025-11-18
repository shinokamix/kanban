// features/task-details/ui/TaskDetailsView.tsx
'use client'

import type { Task } from '@/entities/task'
import { Button } from '@/shared/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'

type TaskDetailsViewProps = {
    task: Task
    onEdit: () => void
    onConfirmDelete: () => void
}

export function TaskDetailsView({ task, onEdit, onConfirmDelete }: TaskDetailsViewProps) {
    return (
        <section className="space-y-4 text-sm" aria-label="Task details">
            <dl className="space-y-3">
                <div>
                    <dt className="text-xs text-muted-foreground">Title</dt>
                    <dd className="font-medium">{task.title}</dd>
                </div>

                <div>
                    <dt className="text-xs text-muted-foreground">Description</dt>
                    <dd>{task.description || 'No description'}</dd>
                </div>

                <div>
                    <dt className="text-xs text-muted-foreground">Status</dt>
                    <dd className="font-medium capitalize">{task.status.replace('-', ' ')}</dd>
                </div>
            </dl>

            <footer className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <p className="text-xs text-muted-foreground">
                        Created:{' '}
                        <time dateTime={task.createdAt} className="font-medium">
                            {new Date(task.createdAt).toLocaleString()}
                        </time>
                    </p>
                    {task.createdAt === task.updatedAt ? (
                        ''
                    ) : (
                        <p className="text-xs text-muted-foreground">
                            Updated:{' '}
                            <time dateTime={task.updatedAt} className="font-medium">
                                {new Date(task.updatedAt).toLocaleString()}
                            </time>
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button size="sm" type="button" onClick={onEdit}>
                        Edit
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" type="button" variant="destructive">
                                Delete
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. The task will be permanently
                                    removed from your board.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={onConfirmDelete}
                                >
                                    Yes, delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </footer>
        </section>
    )
}
