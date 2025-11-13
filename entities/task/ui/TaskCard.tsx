'use client'

import type { Task } from '../model/task.types'

interface TaskCardProps {
    task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
    return (
        <div className="rounded-xl border bg-background p-3 shadow-sm transition hover:shadow-md cursor-pointer">
            <div className="text-sm font-semibold">{task.title}</div>
            {task.description && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-3">
                    {task.description}
                </p>
            )}
        </div>
    )
}
