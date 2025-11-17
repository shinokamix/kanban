'use client'

import { Task } from '@/entities/task'
import { TaskCard } from '@/features/task-details'

type ColumnProps = {
    tasks: Task[]
}

export default function Column({ tasks }: ColumnProps) {
    return (
        <ul>
            {tasks.map((task) => {
                return (
                    <li key={task.id}>
                        <TaskCard task={task} />
                    </li>
                )
            })}
        </ul>
    )
}
